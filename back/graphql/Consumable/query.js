import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { ConsumableType } from './types';
import { Consumable } from '../../db';

export default {
  consumables: {
    type: new GraphQLList(ConsumableType),
    args: {
      title: {
        type: GraphQLString,
      },
    },
    resolve: async (_, args) => {
      const params = {};

      if (args.title) {
        params.title = args.title;
      }

      return await Consumable.findAll({ where: params });
    },
  },
  consumable: {
    type: ConsumableType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_, args) => {
      return await Consumable.findOne({ where: { id: args.id } });
    },
  },
};
