import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { RoleType } from './types';
import { deleteEntityType } from '../common/types';
import { db } from '../../../../db';

export default {
  createRole: {
    // TODO: While role creating also it is important to create role settings by default
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
      return await db
        .insert(input, 'role')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows[0];
        });
    },
  },
  updateRole: {
    type: RoleType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateRole',
          fields: {
            title: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
        }),
      },
    },
    async resolve(_, { id, input }) {
      return await db
        .update(input, 'role')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Role with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  deleteRole: {
    type: deleteEntityType('DeleteRole', 'DeleteRole'),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, { id }) {
      return await db
        .delete('role')
        .where({ id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Role with id=${id} not found`);
          }

          return {
            deleted: true,
            message: `Role with id=${id} successfully deleted`,
          };
        });
    },
  },
};
