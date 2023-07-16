import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Role = sequelize.define('ROLE', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
});
