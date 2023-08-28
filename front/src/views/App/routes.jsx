import { AppRoot } from './components/AppRoot';

export const routes = () => [
  {
    path: 'app',
    element: <AppRoot />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];
