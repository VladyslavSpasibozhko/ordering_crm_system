import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { RoleType } from './types';
import { Role } from '../../db/models';

export default {
  createRole: {
    type: RoleType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateRole',
          fields: {
            title: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await Role.create(input);
    },
  },
};
