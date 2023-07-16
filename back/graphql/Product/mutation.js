import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';
import { ProductType } from './types';
import { Product } from '../../db';

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
      return await Product.create(input);
    },
  },
};
