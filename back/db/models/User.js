import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { Role } from './Role';

export const User = sequelize.define(
  'USER',
  {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  { indexes: [{ unique: true, fields: ['email'] }] },
);
