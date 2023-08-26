export const router = (request, response, config) => {
  const paths = config.keys();

  for (const path of paths) {
    if (request.url.startsWith(path)) {
      const handler = config.get(path);
      handler(request, response);
      return;
    }
  }

  const handler = config.get('*');
  handler(request, response);
};
