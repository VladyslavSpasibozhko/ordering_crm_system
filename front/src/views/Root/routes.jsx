import { Root } from './components/Root';

function NotFound() {
  return <div>NotFound</div>;
}

export const routes = (children) => [
  {
    path: '/',
    element: <Root />,
    children: children,
  },
  {
    path: '*',
    Component: NotFound,
  },
];
