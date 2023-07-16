import { GraphQLInt, GraphQLString, GraphQLObjectType } from 'graphql';

export const ProductCategoryType = new GraphQLObjectType({
  name: 'ProductCategory',
  description: 'ProductCategory',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
  }),
});
