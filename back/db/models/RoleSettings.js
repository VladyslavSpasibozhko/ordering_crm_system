import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { Role } from './Role';

const ENTITIES = [
  'USER',
  'ROLE',
  'PRODUCT',
  'PRODUCT_CATEGORY',
  'PRODUCT_CONSUMABLE',
  'CONSUMABLE',
];

export const RoleSettings = sequelize.define(
  'RoleSettings',
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: Role,
      },
    },
    entity: {
      type: DataTypes.ENUM(...ENTITIES),
      allowNull: false,
    },
    add: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    change: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['role_id', 'entity'],
      },
    ],
  },
);
