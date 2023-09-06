import { Route, Routes } from 'react-router-dom';
import { Root } from './Root';

function NotFound() {
  return <div>NotFound</div>;
}

export function RootRoutes({ children }) {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        {children}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
