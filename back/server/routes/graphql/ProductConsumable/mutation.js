import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { ConsumablesByProductType } from './types';
import { db } from '../../../../db';
import { deleteEntityType } from '../common/types';

export default {
  createProductConsumable: {
    type: ConsumablesByProductType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateProductConsumableType',
          fields: {
            product_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            consumable_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            quantity: {
              type: new GraphQLNonNull(GraphQLInt),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await db
        .insert(input, 'product_consumable')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows[0];
        });
    },
  },
  updateProductConsumable: {
    type: ConsumablesByProductType,
    args: {
      id: { type: GraphQLInt },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateProductConsumableType',
          fields: {
            quantity: {
              type: GraphQLInt,
            },
          },
        }),
      },
    },
    async resolve(_, { id, input }) {
      return await db
        .update(input, 'product_consumable')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Product consumable with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  deleteProductConsumable: {
    type: deleteEntityType(
      'DeleteProductConsumable',
      'DeleteProductConsumable',
    ),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, { id }) {
      return await db
        .delete('product_consumable')
        .where({ id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Product consumable with id=${id} not found`);
          }

          return {
            deleted: true,
            message: `Product consumable with id=${id} successfully deleted`,
          };
        });
    },
  },
};
