import { GraphQLID, GraphQLList } from 'graphql';
import { RoleType } from './types';
import { db } from '../../../../db';

export default {
  role: {
    type: RoleType,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: async (_, args) => {
      return db
        .select(['*'], 'role')
        .where({ id: args.id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Role with id=${args.id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  roles: {
    type: new GraphQLList(RoleType),
    resolve: async () => {
      return db
        .select(['*'], 'role')
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          return res.data.rows;
        });
    },
  },
};
