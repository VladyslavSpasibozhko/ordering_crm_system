import { GraphQLList, GraphQLInt } from 'graphql';
import { ProductCategoryType } from './types';
import { ProductCategory } from '../../db';

export default {
  categories: {
    type: new GraphQLList(ProductCategoryType),
    resolve: async () => {
      return await ProductCategory.findAll();
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
      return await ProductCategory.findOne({ where: { id: args.id } });
    },
  },
};
