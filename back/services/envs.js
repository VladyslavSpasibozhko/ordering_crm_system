import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const envs = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_URL: process.env.DB_URL,
  APP_PORT: process.env.APP_PORT,
  PASSWORD_SECRET_KEY: process.env.PASSWORD_SECRET_KEY,
  ACCESS_TOKEN_EXPIRATION: Number(process.env.ACCESS_TOKEN_EXPIRES_IN),
  REFRESH_TOKEN_EXPIRATION: Number(process.env.REFRESH_TOKEN_EXPIRES_IN),
};
