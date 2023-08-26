import { controller } from '../system/controller';
import { router } from '../system/router';
import {
  changePasswordController,
  confirmController,
  loginController,
  refreshTokenController,
} from './auth';
import { graphqlController } from './graphql';

const authConfig = new Map([
  ['/api/auth/change-password', changePasswordController],
  ['/api/auth/confirm', confirmController],
  ['/api/auth/login', loginController],
  ['/api/auth/refresh-token', refreshTokenController],
]);

const apiConfig = new Map([
  ['/api/auth/', (...args) => router(...args, authConfig)],
  ['/api/graphql/', graphqlController],
  ['*', controller()],
]);

export const routes = new Map([
  ['/api/', (...args) => router(...args, apiConfig)],
  ['*', controller()],
]);
