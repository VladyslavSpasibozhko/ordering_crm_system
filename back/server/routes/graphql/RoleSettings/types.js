import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

export const RoleSettingsType = new GraphQLObjectType({
  name: 'RoleSettings',
  description: 'RoleSettings',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    entity: {
      type: GraphQLString,
    },
    add: {
      type: GraphQLBoolean,
    },
    read: {
      type: GraphQLBoolean,
    },
    change: {
      type: GraphQLBoolean,
    },
    delete: {
      type: GraphQLBoolean,
    },
  }),
});
