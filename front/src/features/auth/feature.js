import {
  retrieveTokens,
  getUserEmail,
  setTokens,
  setUserEmail,
} from 'src/services/ls.storage';
import { authService } from 'src/services/rest/auth';
import { errorToString } from 'src/utils/errorToString';
import { getAuthStore } from 'src/stores/auth.store';
import { client } from 'src/providers/Urql/Urql';
import { UserByEmailQuery } from 'src/services/graphql/user';

function setLogout() {
  const authStore = getAuthStore();

  authStore.setLoggedIn(false);
  authStore.setEmail(null);
  setTokens('', '', '');
  setUserEmail('');
}

function setLogIn(email, access, refresh, expired) {
  const authStore = getAuthStore();

  authStore.setLoggedIn(true);
  authStore.setEmail(email);
  setUserEmail(email);
  setTokens(access, refresh, expired);
}

function calculateExpiresIn(ms) {
  const today = new Date().getTime();
  return today + ms;
}

export function shouldRefreshToken(expiresIn) {
  if (!expiresIn) return false;

  const today = new Date().getTime();
  const expiredDate = Number(expiresIn);

  return today >= expiredDate;
}

export async function refreshTokenFeature(token, email) {
  const res = await authService.refreshTokenReq({
    body: { token },
  });

  if (res.success) {
    setLogIn(
      email,
      res.data.token,
      token,
      calculateExpiresIn(res.data.expiresIn),
    );
  }

  if (!res.success) {
    setLogout();
  }

  return res;
}

export async function initTokenFeature() {
  const email = getUserEmail();
  const tokens = retrieveTokens();

  if (!email) {
    setLogout();
    return;
  }

  if (!tokens.accessToken || !tokens.expiresIn) {
    setLogout();
    return;
  }

  const shouldBeRefreshed = shouldRefreshToken(tokens.expiresIn);

  if (!shouldBeRefreshed) {
    setLogIn(email, tokens.accessToken, tokens.refreshToken, tokens.expiresIn);
    return;
  }

  if (tokens.refreshToken) {
    await refreshTokenFeature(tokens.refreshToken, email);
    return;
  }

  setLogout();
}

export async function confirmFeature(values) {
  const confirmRes = await authService.confirmReq({ body: values });

  if (confirmRes.success) {
    const loginRes = await authService.loginReq({ body: values });

    if (loginRes.success) {
      setLogIn(
        values.email,
        loginRes.data.access,
        loginRes.data.refresh,
        loginRes.data.expiresIn,
      );

      return { success: true, path: '/app' };
    }

    setLogout();

    return { success: true, path: '/auth/login', email: values.email };
  } else {
    const authStore = getAuthStore();
    authStore.setConfirming(false, errorToString(confirmRes));
    return { success: false, path: null };
  }
}

export async function loginFeature(values) {
  const response = await authService.loginReq({ body: values });

  if (response.success) {
    setLogIn(
      values.email,
      response.data.accessToken,
      response.data.refreshToken,
      response.data.expiresIn,
    );

    return { success: true, path: '/app' };
  }

  return { success: false, path: null };
}

export async function loadUserFeature(email) {
  const res = await client.query(UserByEmailQuery, { email }).toPromise();

  if (res.data) {
    const authStore = getAuthStore();
    authStore.setUser(res.data.userByEmail);
  }

  return res;
}
