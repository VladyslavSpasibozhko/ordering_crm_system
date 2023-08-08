import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Role = sequelize.define(
  'Role',
  {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false },
);
