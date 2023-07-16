import { Root } from './components/Root';

export const routes = (children) => [
  {
    path: '/',
    element: <Root />,
    children: children,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];
