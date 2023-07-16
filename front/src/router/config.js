import { rootRoutes } from '../views/Root';
import { graphiQlRoutes } from '../views/GraphiQL';

const _graphiQlRoutes = graphiQlRoutes();
const _rootRoutes = rootRoutes();

export const routesConfig = [].concat(_graphiQlRoutes, _rootRoutes);
