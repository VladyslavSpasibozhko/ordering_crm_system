import { GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { RoleSettingsType } from './types';
import { RoleSettings } from '../../db';

export default {
  roleSettings: {
    type: new GraphQLList(RoleSettingsType),
    args: {
      role_id: {
        type: GraphQLID,
      },
      entity: {
        type: GraphQLString,
      },
    },
    resolve: async (_, args) => {
      if (args.role_id || args.entity) {
        const params = {};

        if (args.role_id) {
          params.role_id = args.role_id;
        }

        if (args.entity) {
          params.entity = args.entity;
        }

        const res = await RoleSettings.findAll({ where: params });

        return res;
      }

      throw new Error('One of key must ne provided: "role_id", "entity"');
    },
  },
};
