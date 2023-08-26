import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import { ProductCategoryType } from '../ProductCategory';
import { db } from '../../../../db';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    category: {
      type: ProductCategoryType,
      resolve: async (source) => {
        return db
          .select(['*'], 'product_category')
          .where({ id: source.category_id })
          .perform()
          .then((res) => {
            if (res.error) throw Error(res.error);

            if (!res.data.rowCount) {
              throw Error(`Category with id=${source.category_id} not found`);
            }

            return res.data.rows[0];
          });
      },
    },
    cost: {
      type: GraphQLInt,
    },
  }),
});
