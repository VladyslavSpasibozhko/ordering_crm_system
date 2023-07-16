import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { UserType } from './types';
import { User } from '../../db';

export default {
  createUser: {
    type: UserType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateUser',
          fields: {
            first_name: {
              type: new GraphQLNonNull(GraphQLString),
            },
            last_name: {
              type: new GraphQLNonNull(GraphQLString),
            },
            email: {
              type: new GraphQLNonNull(GraphQLString),
            },
            role_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      // TODO: add condition if this user con create others users

      return await User.create(input);
    },
  },
};
