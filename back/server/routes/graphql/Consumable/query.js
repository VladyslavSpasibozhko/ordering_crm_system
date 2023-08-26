import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { ConsumableType } from './types';
import { db } from '../../../../db';

export default {
  consumables: {
    type: new GraphQLList(ConsumableType),
    args: {
      title: {
        type: GraphQLString,
      },
    },
    resolve: async (_, args) => {
      return db
        .select(['*'], 'consumable')
        .where({ title: args.title })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);
          return res.data.rows;
        });
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
      return db
        .select(['*'], 'consumable')
        .where({ id: args.id })
        .perform()
        .then((res) => {
          if (res.error) throw Error(res.error);

          if (!res.data.rowCount) {
            throw Error(`Consumable with id=${args.id} not found`);
          }

          return res.data.rows[0];
        });
    },
  },
};
