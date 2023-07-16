import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const ProductCategory = sequelize.define('ProductCategory', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
