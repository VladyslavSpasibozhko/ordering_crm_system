import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { RoleType } from '../Role';
import { Role } from '../../db/models';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    first_name: {
      type: GraphQLString,
    },
    last_name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    role: {
      type: RoleType,
      resolve: async (data) => {
        return await Role.findOne({ id: data.role_id });
      },
    },
  }),
});
