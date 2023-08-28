import { rootRoutes } from '../views/Root';
import { graphiQlRoutes } from '../views/GraphiQL';
import { authRoutes } from '../views/Auth';
import { appRoutes } from '../views/App';

const _graphiQlRoutes = graphiQlRoutes();
const _authRoutes = authRoutes();
const _appRoutes = appRoutes();

const routes = [].concat(_graphiQlRoutes, _authRoutes, _appRoutes);

export const routesConfig = rootRoutes(routes);
