import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { Product } from './Product';
import { Consumable } from './Consumable';

export const ProductConsumable = sequelize.define(
  'ProductConsumable',
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
    },
    consumable_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Consumable,
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['consumable_id', 'product_id'],
      },
    ],
  },
);

// ProductConsumable.drop();
