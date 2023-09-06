import { BrowserRouter, Route } from 'react-router-dom';
import { GraphiQLRoutes } from 'src/views/GraphiQL/routes';
import { AuthRoutes } from 'src/views/Auth/routes';
import { AppRoutes } from 'src/views/App/routes';
import { RootRoutes } from 'src/views/Root/routes';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <RootRoutes>
        <Route path="graphiql" element={<GraphiQLRoutes />} />
        <Route path="auth/*" element={<AuthRoutes />} />
        <Route path="app/*" element={<AppRoutes />} />
      </RootRoutes>
    </BrowserRouter>
  );
};
