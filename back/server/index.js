import http from 'http';
import graphql from '../graphql';
// import jwt from 'jsonwebtoken';
// import * as User from '../db/User';

// const getTokenFromHeaders = (headers) => {
// const authorization = headers['authorization'];

// if (authorization) return authorization.replace('Bearer ', '');
// return null;
// };

// const authenticateToken = (token) => {
// try {
//   const res = jwt.verify(token, secret);
//   return { success: true, data: res };
// } catch (err) {
//   return { success: false, error: err };
// }
// };

// const generateRefreshToken = (data) => {
//   return jwt.sign(data, secret, {
//     expiresIn: '2d',
//   });
// };

// const generateAccessToken = (data) => {
//   const now = new Date().getTime();

//   return {
//     token: jwt.sign(data, secret, {
//       expiresIn: '2m',
//     }),
//     expired: new Date(now + 1000 * 60 * 2),
//   };
// };

const secret = 'SECRET_KEY';

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
          res(JSON.parse(stringified));
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
              message: 'Authentication token is nit provided',
            },
          ],
        }),
      );
    }
  }
}

class GraphQLChain extends Chain {
  async handle(req, res, additional) {
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

    const data = await graphql(additional.body);
    res.writeHead(200, headers);
    res.end(JSON.stringify(data));
  }
}

const checkOptionsChain = new OptionsMethodChain();
const tokenFromHeaderChain = new GetTokenChain();
const authenticateTokenChain = new AuthenticateTokenChain();
const bodyChain = new BodyChain();
const graphqlChain = new GraphQLChain();

checkOptionsChain
  // .setNext(tokenFromHeaderChain)
  // .setNext(authenticateTokenChain)
  .setNext(bodyChain)
  .setNext(graphqlChain);

const serverListener = async (request, response) => {
  try {
    const result = await checkOptionsChain.handle(request, response, {});

    // if (request.url === '/login/') {
    //   try {
    //     const body = await getBody(request);
    //     const res = await User.operations.getUserByFields(body);

    //     if (res) {
    //       const { first_name, last_name, phone } = res;

    //       const data = { first_name, last_name, phone };

    //       const { token, expired } = generateAccessToken(data);
    //       const refreshToken = generateRefreshToken(data);

    //       response.writeHead(200, headers);
    //       response.end(
    //         JSON.stringify({
    //           data: {
    //             token,
    //             refreshToken,
    //             tokenExpiration: expired,
    //           },
    //         }),
    //       );
    //       return;
    //     }

    //     response.writeHead(404, headers);
    //     response.end(
    //       JSON.stringify({
    //         errors: [
    //           {
    //             message: 'Not found',
    //           },
    //         ],
    //       }),
    //     );
    //   } catch (e) {
    //     response.writeHead(500, headers);
    //     response.end(
    //       JSON.stringify({
    //         errors: [
    //           {
    //             message: e.message,
    //           },
    //         ],
    //       }),
    //     );
    //   }

    //   return;
    // }

    // if (request.url === '/register/') {
    //   try {
    //     const body = await getBody(request);
    //     const res = await User.operations.createUser(body);

    //     if (res) {
    //       const { first_name, last_name, phone } = res;

    //       const data = { first_name, last_name, phone };

    //       const { token, expired } = generateAccessToken(data);
    //       const refreshToken = generateRefreshToken(data);

    //       response.writeHead(200, headers);
    //       response.end(
    //         JSON.stringify({
    //           data: {
    //             token,
    //             refreshToken,
    //             tokenExpiration: expired,
    //           },
    //         }),
    //       );
    //       return;
    //     }
    //   } catch (e) {
    //     response.writeHead(400, headers);
    //     response.end(
    //       JSON.stringify({
    //         errors: [
    //           {
    //             message: e.message,
    //           },
    //         ],
    //       }),
    //     );
    //   }

    //   return;
    // }

    // if (request.url === '/refresh_token/') {
    //   const body = await getBody(request);
    //   const { success, data, error } = authenticateToken(body.token);

    //   if (success) {
    //     const { token, expired } = generateAccessToken({
    //       first_name: data.first_name,
    //       last_name: data.last_name,
    //       phone: data.phone,
    //     });

    //     response.writeHead(200, headers);
    //     response.end(
    //       JSON.stringify({
    //         data: {
    //           token,
    //           tokenExpiration: expired,
    //         },
    //       }),
    //     );
    //   }

    //   if (!success) {
    //     response.writeHead(401, headers);
    //     response.end(
    //       JSON.stringify({
    //         errors: [
    //           {
    //             message: error.message,
    //           },
    //         ],
    //       }),
    //     );
    //   }

    //   return;
    // }

    // if (request.url === '/check_token/') {
    //   const body = await getBody(request);
    //   const result = authenticateToken(body.token);

    //   if (result.success) {
    //     response.writeHead(200, headers);

    //     response.end(
    //       JSON.stringify({
    //         data: {
    //           success: true,
    //         },
    //       }),
    //     );

    //     return;
    //   }

    //   response.writeHead(401, headers);
    //   response.end(
    //     JSON.stringify({
    //       data: {
    //         success: false,
    //         error: result.error.message,
    //       },
    //     }),
    //   );

    //   return;
    // }

    if (request.url === '/api/') {
      // TODO: add check token function
      // const token = getTokenFromHeaders(request.headers);
      // const result = authenticateToken(token);
      // if (!result.success) {
      //   response.writeHead(401, headers);
      //   response.end(
      //     JSON.stringify({
      //       errors: [
      //         {
      //           message: result.error.message,
      //         },
      //       ],
      //     }),
      //   );
      //   return;
      // }
      // const body = await getBody(request);
      // const data = await graphql(body);
      // response.writeHead(200, headers);
      // response.end(JSON.stringify(data));
    }
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
