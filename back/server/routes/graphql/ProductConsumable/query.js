import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';
import { ProductsByConsumableType, ConsumablesByProductType } from './types';
import { db } from '../../../../db';

export default {
  consumablesByProduct: {
    type: new GraphQLList(ConsumablesByProductType),
    args: {
      product_id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: async (_, args) => {
      return await db
        .select(['*'], 'product_consumable')
        .where({ product_id: args.product_id })
        .perform()
        .then((res) => {
          if (res.error) return [];
          return res.data.rows;
        });
    },
  },

  productsByConsumable: {
    type: new GraphQLList(ProductsByConsumableType),
    args: {
      consumable_id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: async (_, { consumable_id }) => {
      return await db
        .select(['*'], 'product_consumable')
        .where({ consumable_id })
        .perform()
        .then((res) => {
          if (res.error) return [];
          return res.data.rows;
        });
    },
  },
};
