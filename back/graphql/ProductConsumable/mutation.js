import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { ConsumablesByProductType } from './types';
import { ProductConsumable, Consumable } from '../../db';

export default {
  createProductConsumable: {
    type: ConsumablesByProductType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateProductConsumableType',
          fields: {
            product_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            consumable_id: {
              type: new GraphQLNonNull(GraphQLInt),
            },
            quantity: {
              type: new GraphQLNonNull(GraphQLInt),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      const result = await ProductConsumable.create(input);
      const consumable = await Consumable.findOne({ id: input.consumable_id });

      return { consumable, quantity: input.quantity };
    },
  },
};
