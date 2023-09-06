import { Route, Routes } from 'react-router-dom';
import { GraphiQl } from './GraphiQL';

export function GraphiQLRoutes() {
  return (
    <Routes>
      <Route index element={<GraphiQl />} />
    </Routes>
  );
}
