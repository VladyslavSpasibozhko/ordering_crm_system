import { GraphQLList, GraphQLInt } from 'graphql';
import { ProductCategoryType } from './types';
import { db } from '../../../../db';

export default {
  categories: {
    type: new GraphQLList(ProductCategoryType),
    resolve: async () => {
      return db
        .select(['*'], 'product_category')
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          return res.data.rows;
        });
    },
  },
  category: {
    type: ProductCategoryType,
    args: {
      id: {
        type: GraphQLInt,
      },
    },
    resolve: async (_, args) => {
      return db
        .select(['*'], 'product_category')
        .where({ id: args.id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Category with id=${args.id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
};
