import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { User } from './User';

// TODO: Write migrations
export const UserAuth = sequelize.define('UserAuth', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'email',
    },
  },
  password_hash: {
    type: DataTypes.STRING(),
  },
  salt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
