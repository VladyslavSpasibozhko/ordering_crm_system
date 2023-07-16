import {
  RouterProvider as Provider,
  createBrowserRouter,
} from 'react-router-dom';
import { routesConfig } from './config';

const router = createBrowserRouter(routesConfig);

export const RouterProvider = () => {
  return <Provider router={router} />;
};
