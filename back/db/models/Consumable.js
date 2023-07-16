import { DataTypes } from 'sequelize';
import { sequelize } from '../db';

export const Consumable = sequelize.define('Consumable', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  measurement: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
