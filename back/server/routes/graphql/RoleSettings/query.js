import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { RoleSettingsType } from './types';
import { db } from '../../../../db';

export default {
  roleSettings: {
    type: new GraphQLList(RoleSettingsType),
    args: {
      role_id: {
        type: GraphQLID,
      },
      entity: {
        type: GraphQLString,
      },
    },
    resolve: async (_, { role_id, entity }) => {
      return await db
        .select(['*'], 'role_settings')
        .where({ role_id, entity })
        .perform()
        .then((res) => {
          if (res.error) return [];
          return res.data.rows;
        });
    },
  },
  roleSetting: {
    type: RoleSettingsType,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: async (_, { id }) => {
      return await db
        .select(['*'], 'role_settings')
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
