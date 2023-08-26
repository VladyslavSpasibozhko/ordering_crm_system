import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';
import { ConsumableType } from './types';
import { deleteEntityType } from '../common/types';
import { db } from '../../../../db';

export default {
  createConsumable: {
    type: ConsumableType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateConsumable',
          fields: {
            title: {
              type: new GraphQLNonNull(GraphQLString),
            },
            measurement: {
              type: new GraphQLNonNull(GraphQLString),
            },
            cost: {
              type: new GraphQLNonNull(GraphQLInt),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await db
        .insert(input, 'consumable')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows[0];
        });
    },
  },
  updateConsumable: {
    type: ConsumableType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateConsumable',
          fields: {
            title: {
              type: GraphQLString,
            },
            measurement: {
              type: GraphQLString,
            },
            cost: {
              type: GraphQLInt,
            },
          },
        }),
      },
    },
    async resolve(_, { id, input }) {
      return await db
        .update(input, 'consumable')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Consumable with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  deleteConsumable: {
    type: deleteEntityType('DeleteConsumable', 'DeleteConsumable'),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, { id }) {
      return await db
        .delete('consumable')
        .where({ id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Consumable with id=${id} not found`);
          }

          return {
            deleted: true,
            message: `Consumable with id=${id} successfully deleted`,
          };
        });
    },
  },
};
