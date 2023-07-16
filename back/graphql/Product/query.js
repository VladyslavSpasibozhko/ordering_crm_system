import { GraphQLList } from 'graphql';
import { ProductType } from './types';
import { Product } from '../../db';

export default {
  products: {
    type: new GraphQLList(ProductType),
    resolve: async () => {
      return await Product.findAll();
    },
  },
  product: {
    type: ProductType,
    resolve: async (_, args) => {
      return await Product.findOne({ where: { id: args.id } });
    },
  },
};
