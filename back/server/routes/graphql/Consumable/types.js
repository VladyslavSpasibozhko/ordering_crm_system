import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';

export const ConsumableType = new GraphQLObjectType({
  name: 'Consumable',
  description: 'Consumable',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    measurement: {
      type: GraphQLString,
    },
    cost: {
      type: GraphQLInt,
    },
  }),
});
