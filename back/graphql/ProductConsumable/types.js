import { GraphQLInt, GraphQLObjectType } from 'graphql';
import { ConsumableType } from '../Consumable';
import { ProductType } from '../Product';

export const ProductsByConsumableType = new GraphQLObjectType({
  name: 'ProductsByConsumable',
  description: 'ProductsByConsumable',
  fields: () => ({
    product: {
      type: ProductType,
    },
    quantity: {
      type: GraphQLInt,
    },
  }),
});

export const ConsumablesByProductType = new GraphQLObjectType({
  name: 'ConsumablesByProduct',
  description: 'ConsumablesByProduct',
  fields: () => ({
    consumable: {
      type: ConsumableType,
    },
    quantity: {
      type: GraphQLInt,
    },
  }),
});
