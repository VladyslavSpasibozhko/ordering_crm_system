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

export default async ({ query, operationName, variables }) => {
  return graphql({
    schema,
    source: query,
    operationName,
    variableValues: variables,
  });
};
