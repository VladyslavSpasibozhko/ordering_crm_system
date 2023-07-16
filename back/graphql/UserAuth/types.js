import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const UserAuthType = new GraphQLObjectType({
  name: 'UserAuth',
  description: 'UserAuth',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    password_hash: {
      type: GraphQLString,
    },
    salt: {
      type: GraphQLString,
    },
    user_id: {
      type: GraphQLInt,
    },
  }),
});
