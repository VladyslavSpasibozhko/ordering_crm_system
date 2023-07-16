import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const RoleType = new GraphQLObjectType({
  name: 'Role',
  description: 'Role',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
  }),
});
