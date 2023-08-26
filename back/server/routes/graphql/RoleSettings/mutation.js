import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { RoleSettingsType } from './types';
import { db } from '../../../../db';
import { deleteEntityType } from '../common/types';

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
            add: {
              type: GraphQLBoolean,
              defaultValue: false,
            },
            read: {
              type: GraphQLBoolean,
              defaultValue: false,
            },
            change: {
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
      return await db
        .insert(input, 'role_settings')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows[0];
        });
    },
  },
  updateRoleSetting: {
    type: RoleSettingsType,
    args: {
      id: { type: GraphQLInt },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateRoleSetting',
          fields: {
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
          },
        }),
      },
    },
    async resolve(_, { id, input }) {
      return await db
        .update(input, 'role_settings')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Settings with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  deleteRoleSetting: {
    type: deleteEntityType('DeleteRoleSetting', 'DeleteRoleSetting'),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, { id }) {
      return await db
        .delete('role_settings')
        .where({ id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Settings with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
};
