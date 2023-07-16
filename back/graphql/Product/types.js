import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';
import { ProductCategoryType } from '../ProductCategory';
import { ProductCategory } from '../../db';

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
        return await ProductCategory.findOne({
          where: { id: source.category_id },
        });
      },
    },
    cost: {
      type: GraphQLInt,
    },
  }),
});
