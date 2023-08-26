import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { ProductType } from './types';
import { deleteEntityType } from '../common/types';
import { db } from '../../../../db';

export default {
  createProduct: {
    type: ProductType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateProduct',
          fields: {
            title: {
              type: new GraphQLNonNull(GraphQLString),
            },
            category_id: {
              type: new GraphQLNonNull(GraphQLInt),
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
        .insert(input, 'product')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows[0];
        });
    },
  },
  updateProduct: {
    type: ProductType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateProduct',
          fields: {
            title: {
              type: GraphQLString,
            },
            category_id: {
              type: GraphQLInt,
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
        .update(input, 'product')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Product with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  deleteProduct: {
    type: deleteEntityType('DeleteProduct', 'DeleteProduct'),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, { id }) {
      return await db
        .delete('product')
        .where({ id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Product with id=${id} not found`);
          }

          return {
            deleted: true,
            message: `Product with id=${id} successfully deleted`,
          };
        });
    },
  },
};
