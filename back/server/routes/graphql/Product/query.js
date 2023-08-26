import { GraphQLList } from 'graphql';
import { ProductType } from './types';
import { db } from '../../../../db';

export default {
  products: {
    type: new GraphQLList(ProductType),
    resolve: async () => {
      return db
        .select(['*'], 'product')
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows;
        });
    },
  },
  product: {
    type: ProductType,
    resolve: async (_, args) => {
      return db
        .select(['*'], 'product')
        .where({ id: args.id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Product with id=${args.id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
};
