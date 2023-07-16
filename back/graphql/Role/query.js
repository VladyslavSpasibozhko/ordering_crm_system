import { GraphQLID, GraphQLList } from 'graphql';
import { RoleType } from './types';
import { Role } from '../../db';

export default {
  role: {
    type: RoleType,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: async (_, args) => {
      return Role.findOne({ id: args.id });
    },
  },
  roles: {
    type: new GraphQLList(RoleType),
    resolve: async () => {
      return Role.findAll();
    },
  },
};
