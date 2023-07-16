import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { ProductCategoryType } from './types';
import { ProductCategory } from '../../db';

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
      return await ProductCategory.create(input);
    },
  },
};
