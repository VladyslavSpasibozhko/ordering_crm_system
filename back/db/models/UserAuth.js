import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { User } from './User';

export const UserAuth = sequelize.define('UserAuth', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  password_hash: {
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  salt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
