import http from 'http';
import { routes } from './routes';
import { router } from './system/router';

export const create = () => {
  return http.createServer((request, response) => {
    router(request, response, routes);
  });
};
