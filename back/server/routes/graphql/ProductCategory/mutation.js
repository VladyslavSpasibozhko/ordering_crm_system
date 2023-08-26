import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { ProductCategoryType } from './types';
import { db } from '../../../../db';
import { deleteEntityType } from '../common/types';

export default {
  createCategory: {
    type: ProductCategoryType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateProductCategory',
          fields: {
            title: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await db
        .insert(input, 'product_category')
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows[0];
        });
    },
  },
  updateCategory: {
    type: ProductCategoryType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      input: {
        type: new GraphQLInputObjectType({
          name: 'UpdateProductCategory',
          fields: {
            title: {
              type: GraphQLString,
            },
          },
        }),
      },
    },
    async resolve(_, { id, input }) {
      return await db
        .update(input, 'product_category')
        .where({ id })
        .returning(['*'])
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Category with id=${id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
  deleteCategory: {
    type: deleteEntityType('DeleteCategory', 'DeleteCategory'),
    args: {
      id: { type: GraphQLInt },
    },
    async resolve(_, { id }) {
      return await db
        .delete('product_category')
        .where({ id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Category with id=${id} not found`);
          }

          return {
            deleted: true,
            message: `Category with id=${id} successfully deleted`,
          };
        });
    },
  },
};
