import { graphql, GraphQLSchema, GraphQLObjectType } from 'graphql';
import { UserQuery, UserMutation } from './User';
import { RoleQuery, RoleMutation } from './Role';
import { RoleSettingsQuery, RoleSettingsMutation } from './RoleSettings';
import {
  ProductCategoryQuery,
  ProductCategoryMutation,
} from './ProductCategory';
import { ProductQuery, ProductMutation } from './Product';
import { ConsumableQuery, ConsumableMutation } from './Consumable';
import {
  ProductConsumableQuery,
  ProductConsumableMutation,
} from './ProductConsumable';
import { controller } from '../../system/controller';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...UserQuery,
    ...RoleQuery,
    ...RoleSettingsQuery,
    ...ProductQuery,
    ...ProductCategoryQuery,
    ...ConsumableQuery,
    ...ProductConsumableQuery,
  },
});

const RootMutations = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...UserMutation,
    ...RoleMutation,
    ...RoleSettingsMutation,
    ...ProductMutation,
    ...ProductCategoryMutation,
    ...ProductConsumableMutation,
    ...ConsumableMutation,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations,
});

const root = async ({ query, operationName, variables }) => {
  return await graphql({
    schema,
    source: query,
    operationName,
    variableValues: variables,
  });
};

export const graphqlController = controller([
  [
    'POST',
    async ({ request, response, options }) => {
      const body = await options.getBody(request);

      const result = await root(body);

      if (result.errors) {
        const error = result.errors.map((error) => error.message).join('|');

        response.writeHead(400, options.headers);
        response.end(options.errorResponse(error));
        return;
      }

      if (result.data) {
        response.writeHead(200, options.headers);
        response.end(options.successResponse(result.data));
      }
    },
  ],
  [
    'OPTIONS',
    ({ response, options }) => {
      response.writeHead(200, options.headers);
      response.end(options.successResponse({ success: true }));
    },
  ],
]);
