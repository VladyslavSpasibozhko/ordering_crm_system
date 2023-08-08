import http from 'http';
import { routes } from './routes';
import { router } from './router';

export const create = () => {
  return http.createServer((request, response) => {
    router(request, response, routes);
  });
};
