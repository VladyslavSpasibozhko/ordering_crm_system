import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLUnionType,
} from 'graphql';
import { RoleSettingsType } from './types';
import { RoleSettings } from '../../db/models';

export default {
  createRoleSetting: {
    type: RoleSettingsType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateRoleSetting',
          fields: {
            role_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            entity: {
              type: new GraphQLNonNull(GraphQLString),
            },
            create: {
              type: GraphQLBoolean,
              defaultValue: false,
            },
            read: {
              type: GraphQLBoolean,
              defaultValue: false,
            },
            update: {
              type: GraphQLBoolean,
              defaultValue: false,
            },
            delete: {
              type: GraphQLBoolean,
              defaultValue: false,
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await RoleSettings.create(input);
    },
  },
};
