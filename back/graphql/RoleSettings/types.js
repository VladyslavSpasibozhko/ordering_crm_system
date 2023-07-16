import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';

export const RoleSettingsType = new GraphQLObjectType({
  name: 'RoleSettings',
  description: 'RoleSettings',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    entity: {
      type: GraphQLString,
    },
    create: {
      type: GraphQLBoolean,
      resolve: (source) => {
        return source.dataValues.create;
      },
    },
    read: {
      type: GraphQLBoolean,
    },
    update: {
      type: GraphQLBoolean,
      resolve: (source) => {
        return source.dataValues.update;
      },
    },
    delete: {
      type: GraphQLBoolean,
    },
  }),
});
