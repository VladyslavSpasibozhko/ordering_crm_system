export const controller = (config = []) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000,
  };

  const successResponse = (data) => {
    const result = {
      success: true,
      data,
    };

    return JSON.stringify(result);
  };

  const errorResponse = (error) => {
    const result = {
      success: false,
      errors: [
        {
          message: error,
        },
      ],
    };

    return JSON.stringify(result);
  };

  const getBody = async (request) => {
    return await new Promise((resolve, reject) => {
      try {
        const chunks = [];

        request.on('data', (chunk) => {
          chunks.push(chunk);
        });

        request.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const stringified = buffer.toString();

          try {
            resolve(JSON.parse(stringified));
          } catch (e) {
            resolve({});
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const unknownRoute = ({ response }) => {
    response.writeHead(404, headers);
    response.end(errorResponse('Route not found'));
  };

  const notFound = ({ response, error = 'Not found' }) => {
    response.writeHead(404, headers);
    response.end(errorResponse(error));
  };

  const badRequest = ({ response, error = 'Bad request' }) => {
    response.writeHead(400, headers);
    response.end(errorResponse(error));
  };

  const success = ({ response, data }) => {
    response.writeHead(200, headers);
    response.end(successResponse(data));
  };

  const serverError = ({ response, error = 'Server error' }) => {
    response.writeHead(500, headers);
    response.end(errorResponse(error));
  };

  const methods = new Map([
    ['GET', null],
    ['POST', null],
    ['PUT', null],
    ['DELETE', null],
    ['OPTIONS', null],
    ['*', unknownRoute],
    ...config,
  ]);

  return (request, response) => {
    const params = {
      request,
      response,
      options: {
        headers,
        getBody,
        successResponse,
        errorResponse,
        notFound: (error) => notFound({ response, error }),
        badRequest: (error) => badRequest({ response, error }),
        success: (data) => success({ response, data }),
        serverError: (error) => serverError({ response, error }),
      },
    };

    const methodController = methods.get(request.method);

    if (!methodController) {
      const unknownMethodController = methods.get('*');
      unknownMethodController(params);
      return;
    }

    methodController(params);
  };
};
