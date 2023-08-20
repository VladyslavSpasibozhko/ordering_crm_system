import { Database } from './db';
import { envs } from '../services/envs';

export const db = new Database({
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  database: envs.DB_NAME,
  user: envs.DB_USER,
  password: envs.DB_PASSWORD,
});
