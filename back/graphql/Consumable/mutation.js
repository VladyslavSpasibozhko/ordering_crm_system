import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { ConsumableType } from './types';
import { Consumable } from '../../db';

export default {
  createConsumable: {
    type: ConsumableType,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'CreateConsumable',
          fields: {
            title: {
              type: new GraphQLNonNull(GraphQLString),
            },
            measurement: {
              type: new GraphQLNonNull(GraphQLString),
            },
            cost: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
        }),
      },
    },
    async resolve(_, { input }) {
      return await Consumable.create(input);
    },
  },
};
