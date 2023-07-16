import { GraphQLID, GraphQLList } from 'graphql';
import { UserAuthType } from './types';
import { UserAuth } from '../../db/models';

export default {
  userAuth: {
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
};
