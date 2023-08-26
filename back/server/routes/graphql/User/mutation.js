import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLObjectType,
} from 'graphql';
import { UserType } from './types';
import { db } from '../../../../db';

export default {
  createUser: {
    type: UserType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateUser',
          fields: {
            first_name: {
              type: new GraphQLNonNull(GraphQLString),
            },
            last_name: {
              type: new GraphQLNonNull(GraphQLString),
            },
            email: {
              type: new GraphQLNonNull(GraphQLString),
            },
            role_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await db
        .insert(input, 'users')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.data && res.data.rows) {
            const user = res.data.rows[0];

            return db
              .insert({ email: user.email, confirmed: false }, 'user_auth')
              .returning(['*'])
              .perform()
              .then((res) => {
                if (res.data && res.data.rows) return user;

                if (res.error) {
                  throw Error(res.error);
                }
              });
          }

          if (res.error) {
            throw Error(res.error);
          }
        });
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateUser',
          fields: {
            first_name: {
              type: GraphQLString,
            },
            last_name: {
              type: GraphQLString,
            },
            email: {
              type: GraphQLString,
            },
            role_id: {
              type: GraphQLInt,
            },
          },
        }),
      },
    },
    async resolve(_, { id, input }) {
      return await db
        .update(input, 'users')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) {
            throw Error(res.error);
          }

          if (!res.data.rowCount) {
            throw Error(`User with id=${id} not found`);
          }

          if (res.data.rows) {
            return res.data.rows[0];
          }

          return null;
        });
    },
  },
  deleteUser: {
    type: new GraphQLObjectType({
      name: 'DeleteUser',
      description: 'Delete user type',
      fields: {
        deleted: {
          type: GraphQLBoolean,
        },
        message: {
          type: GraphQLString,
        },
      },
    }),
    args: {
      id: {
        type: GraphQLInt,
      },
    },
    async resolve(_, args) {
      return await db
        .delete('users')
        .where({ id: args.id })
        .perform()
        .then((res) => {
          if (res.data) {
            return {
              deleted: true,
              message: `User with id=${args.id} successfully deleted`,
            };
          }

          throw Error(res.error);
        });
    },
  },
};
