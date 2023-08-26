import { GraphQLInt, GraphQLObjectType } from 'graphql';
import { ConsumableType } from '../Consumable';
import { ProductType } from '../Product';
import { db } from '../../../../db';

export const ProductsByConsumableType = new GraphQLObjectType({
  name: 'ProductsByConsumable',
  description: 'ProductsByConsumable',
  fields: () => ({
    id: { type: GraphQLInt },
    product: {
      type: ProductType,
      async resolve({ product_id }) {
        return await db
          .select(['*'], 'product')
          .where({ id: product_id })
          .perform()
          .then((res) => {
            if (res.error) throw Error(res.error);
            return res.data.rows[0];
          });
      },
    },
    quantity: {
      type: GraphQLInt,
    },
  }),
});

export const ConsumablesByProductType = new GraphQLObjectType({
  name: 'ConsumablesByProduct',
  description: 'ConsumablesByProduct',
  fields: () => ({
    id: { type: GraphQLInt },
    consumable: {
      type: ConsumableType,
      async resolve({ consumable_id }) {
        return await db
          .select(['*'], 'consumable')
          .where({ id: consumable_id })
          .perform()
          .then((res) => {
            if (res.error) throw Error(res.error);
            return res.data.rows[0];
          });
      },
    },
    quantity: {
      type: GraphQLInt,
    },
    // product: {
    //   type: ProductType,
    //   async resolve(_, { product_id }) {
    //     return await db
    //       .select(['*'], 'product')
    //       .where({ id: product_id })
    //       .perform()
    //       .then((res) => {
    //         if (res.error) throw Error(res.error);
    //         return res.data.rows[0];
    //       });
    //   },
    // },
  }),
});
