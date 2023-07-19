import http from 'http';
import endpoints from '../endpoints';
import { endpoints as auth } from '../services/auth';

// TODO: Add router

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000,
};

class Chain {
  nextHandler;

  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request, response, additional) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request, response, additional);
    }

    return null;
  }
}

class OptionsMethodChain extends Chain {
  async handle(req, res, additional) {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      res.end();

      return null;
    }

    return await super.handle(req, res, additional);
  }
}

class BodyChain extends Chain {
  // TODO: add checking for methods
  async handle(req, res, additional) {
    try {
      const body = await new Promise((res) => {
        const chunks = [];

        req.on('data', (chunk) => {
          chunks.push(chunk);
        });

        req.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const stringified = buffer.toString();

          try {
            res(JSON.parse(stringified));
          } catch (e) {
            res({});
          }
        });
      });

      return super.handle(req, res, { ...additional, body });
    } catch (e) {
      console.log('Body parsing error', e);
      return {};
    }
  }
}

class GetTokenChain extends Chain {
  handle(req, res, additional) {
    const authorization = req.headers['authorization'];

    if (authorization) {
      const token = authorization.replace('Bearer ', '');
      return super.handle(req, res, { ...additional, token });
    }

    return super.handle(req, res, additional);
  }
}

class AuthenticateTokenChain extends Chain {
  handle(req, res, additional) {
    try {
      const authenticated = jwt.verify(additional.token, secret);
      return super.handle(req, res, {
        ...additional,
        authenticated: Boolean(authenticated),
      });
    } catch (err) {
      res.writeHead(400, headers);
      res.end(
        JSON.stringify({
          errors: [
            {
              message: 'Authentication token is not provided',
            },
          ],
        }),
      );
    }
  }
}

class EndpointsChain extends Chain {
  async handle(req, res, additional) {
    // console.log(req.method);
    // console.log(req.url);

    auth.login(req, res);

    return;

    if (!additional.body) {
      res.writeHead(400, headers);
      res.end(
        JSON.stringify({
          errors: [
            {
              message: 'Request without body',
            },
          ],
        }),
      );

      return null;
    }

    const data = await endpoints(additional.body);
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }
}

const checkOptionsChain = new OptionsMethodChain();
const tokenFromHeaderChain = new GetTokenChain();
const authenticateTokenChain = new AuthenticateTokenChain();
const bodyChain = new BodyChain();
const endpointsChain = new EndpointsChain();

checkOptionsChain
  // .setNext(tokenFromHeaderChain)
  // .setNext(authenticateTokenChain)
  .setNext(bodyChain)
  .setNext(endpointsChain);

const serverListener = async (request, response) => {
  try {
    const result = await checkOptionsChain.handle(request, response, {});
  } catch (e) {
    response.writeHead(500, headers);
    response.end(
      JSON.stringify({
        errors: [
          {
            message: e.message || 'Server error',
          },
        ],
      }),
    );
  }
};

export const create = () => {
  return http.createServer(serverListener);
};
