import {
  retrieveTokens,
  getUserEmail,
  setTokens,
  setUserEmail,
} from 'src/services/ls.storage';
import { authActions } from './store';
import { authService } from 'src/services/rest/auth';
import { errorToString } from 'src/utils/errorToString';

function setLogout() {
  authActions.setLoggedIn(false);
  authActions.setEmail(null);
  setTokens('', '', '');
  setUserEmail('');
}

function setLogIn(email, access, refresh, expired) {
  authActions.setLoggedIn(true);
  authActions.setEmail(email);
  setUserEmail(email);

  setTokens(access, refresh, expired);
}

function shouldRefreshToken(expiresIn) {
  if (!expiresIn) return false;

  const today = new Date().getTime();
  const expiredDate = Number(expiresIn);

  return today >= expiredDate;
}

export async function refreshTokenFeature() {
  const res = await authService.refreshTokenReq({
    body: { token: tokens.refreshToken },
  });

  if (res.success) {
    setLogIn(email, res.data.token, res.data.expiresIn, tokens.refreshToken);
  }

  if (!res.success) {
    setLogout();
  }

  return res;
}

export async function initTokenFeature() {
  const email = getUserEmail();
  const tokens = retrieveTokens();

  const login = () => ({
    login: true,
    path: '/app',
  });

  const logout = () => ({
    login: false,
    path: '/auth/login',
  });

  if (!email) {
    setLogout();
    return logout();
  }

  if (!tokens.accessToken || !tokens.expiresIn) {
    setLogout();
    return logout();
  }

  const shouldBeRefreshed = shouldRefreshToken();

  if (shouldBeRefreshed) {
    if (tokens.refreshToken) {
      const res = await refreshTokenFeature();
      return res.success ? login() : logout();
    }

    setLogout();
    return logout();
  }

  authActions.setLoggedIn(true);
  authActions.setEmail(email);

  return login();
}

export async function confirmFeature(values) {
  authActions.setConfirming(true);

  const confirmRes = await authService.confirmReq({ body: values });

  if (confirmRes.success) {
    authActions.setLoginIng(true);
    const loginRes = await authService.loginReq({ body: values });

    if (loginRes.success) {
      setLogIn(
        values.email,
        loginRes.data.access,
        loginRes.data.refresh,
        loginRes.data.expiresIn,
      );

      authActions.setLoginIng(false, null);
      return { success: true, path: '/app' };
    }

    setLogout();
    authActions.setLoginIng(false, errorToString(loginRes));

    return { success: true, path: '/auth/login', email: values.email };
  } else {
    authActions.setConfirming(false, errorToString(confirmRes));
    return { success: false, path: null };
  }
}

export async function loginFeature(values) {
  authActions.setLoginIng(true);

  const response = await authService.loginReq({ body: values });

  if (response.success) {
    setLogIn(
      values.email,
      response.data.access,
      response.data.refresh,
      response.data.expiresIn,
    );

    authActions.setLoginIng(false, null);
    return { success: true, path: '/app' };
  }

  authActions.setLoginIng(false, errorToString(response));
  return { success: false, path: null };
}
