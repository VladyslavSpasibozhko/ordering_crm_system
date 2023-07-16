import { DataTypes } from 'sequelize';
import { ProductCategory } from './ProductCategory';
import { sequelize } from '../db';

export const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: ProductCategory,
      key: 'id',
    },
  },
});
