import { AppRoot } from './components/AppRoot';
import { Workplace } from './Workplace';

export const routes = () => [
  {
    path: 'app',
    element: <AppRoot />,
    children: [
      {
        path: 'workplace',
        element: <Workplace />,
      },
    ],
  },
];
