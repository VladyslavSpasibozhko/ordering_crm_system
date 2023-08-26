import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';

export const deleteEntityType = (name, description) => {
  return new GraphQLObjectType({
    name: name,
    description: description,
    fields: {
      deleted: {
        type: GraphQLBoolean,
      },
      message: {
        type: GraphQLString,
      },
    },
  });
};
