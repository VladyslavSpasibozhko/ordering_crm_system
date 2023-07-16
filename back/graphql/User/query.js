import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from './types';
import { User } from '../../db/models';

export default {
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: async (_, args) => {
      return await User.findOne({ id: args.id });
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      //
    },
  },
};
