import { Auth } from './components/Auth';
import { Confirm } from './components/Confirm';
import { Login } from './components/Login';

export const routes = () => [
  {
    path: 'auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'confirm',
        element: <Confirm />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];
