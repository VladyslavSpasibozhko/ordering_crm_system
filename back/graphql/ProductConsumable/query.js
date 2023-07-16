import { GraphQLList, GraphQLInt, GraphQLNonNull } from 'graphql';
import { ProductsByConsumableType, ConsumablesByProductType } from './types';
import { Consumable, Product, ProductConsumable } from '../../db';

export default {
  consumablesByProduct: {
    type: new GraphQLList(ConsumablesByProductType),
    args: {
      productId: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: async (_, args) => {
      const productConsumables = await ProductConsumable.findAll({
        where: { product_id: args.productId },
      });

      const consumablesMap = new Map(
        productConsumables.map((e) => [e.consumable_id, e]),
      );

      const consumables = await Consumable.findAll({
        where: {
          id: Array.from(consumablesMap.keys()),
        },
      });

      return consumables.map((consumable) => ({
        consumable,
        quantity: consumablesMap.get(consumable.id).quantity,
      }));
    },
  },

  productsByConsumable: {
    type: new GraphQLList(ProductsByConsumableType),
    args: {
      consumableId: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: async (source, args) => {
      const productsByConsumable = await ProductConsumable.findAll({
        where: { consumable_id: args.consumableId },
      });

      const productMap = new Map([
        productsByConsumable.map((e) => [e.product_id, e]),
      ]);

      const products = await Product.findAll({
        where: { id: productMap.keys() },
      });

      return products.map((product) => ({
        product,
        quantity: productMap.get(product.id).quantity,
      }));
    },
  },
};
