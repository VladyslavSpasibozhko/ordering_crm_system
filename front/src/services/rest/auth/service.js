import { login, check_token, refresh_token, confirm } from './endpoints';
import { fetch } from '../fetch_client';

export const loginReq = async ({ body }) => {
  const params = login({ body });
  return await fetch(params);
};

export const confirmReq = async ({ body }) => {
  const params = confirm({ body });
  return await fetch(params);
};

export const checkTokenReq = async ({ body }) => {
  const params = check_token({ body });
  return await fetch(params);
};

export const refreshTokenReq = async ({ body }) => {
  const params = refresh_token({ body });
  return await fetch(params);
};
