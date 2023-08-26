import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from './types';
import { db } from '../../../../db';

export default {
  user: {
    type: UserType,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: async (_, args) => {
      return db
        .select(['*'], 'users')
        .where({ id: args.id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`User with id=${args.id} not found`);
          }

          if (res.data.rows) return res.data.rows[0];
        });
    },
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      return await db
        .select(['*'], 'users')
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          return res.data.rows;
        });
    },
  },
};
