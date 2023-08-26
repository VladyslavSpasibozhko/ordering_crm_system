import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import { RoleType } from '../Role';
import { db } from '../../../../db';

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
    confirmed: {
      type: GraphQLBoolean,
      resolve: async (data) => {
        return await db
          .select(['confirmed'], 'user_auth')
          .where({ email: data.email })
          .perform()
          .then((res) => {
            if (res.error) throw Error(res.error);

            if (!res.data.rowCount) {
              throw Error(`Row with email=${data.email} not found`);
            }

            if (res.data && res.data.rows) return res.data.rows[0].confirmed;
          });
      },
    },
    role: {
      type: RoleType,
      resolve: async (data) => {
        return await db
          .select(['*'], 'role')
          .where({ id: data.role_id })
          .perform()
          .then((res) => {
            if (res.error) throw Error(res.error);

            if (!res.data.rowCount) {
              throw Error(`Role with id=${data.role_id} not found`);
            }

            if (res.data.rows) return res.data.rows[0];
          });
      },
    },
  }),
});
