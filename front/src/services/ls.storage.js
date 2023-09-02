const KEYS = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  EXPIRES_IN: 'EXPIRES_IN',
  USER_EMAIL: 'USER_EMAIL',
};

export const setItem = (key, value) => {
  localStorage.setItem(
    key,
    typeof value === 'string' ? value : JSON.stringify(value),
  );
};

export const getItem = (key) => {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
};

export const retrieveTokens = () => {
  const accessToken = getItem(KEYS.ACCESS_TOKEN);
  const refreshToken = getItem(KEYS.REFRESH_TOKEN);
  const expiresIn = getItem(KEYS.EXPIRES_IN);

  return {
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    expiresIn: expiresIn || null,
  };
};

export const setAccessToken = (token) => {
  setItem(KEYS.ACCESS_TOKEN, token);
};

export const setRefreshToken = (token) => {
  setItem(KEYS.REFRESH_TOKEN, token);
};

export const setExpiresIn = (ms) => {
  const today = new Date().getTime();
  const expiredDate = today + ms;

  setItem(KEYS.EXPIRES_IN, expiredDate);
};

export const setTokens = (access, refresh, expires) => {
  setAccessToken(access);
  setRefreshToken(refresh);
  setExpiresIn(expires);
};

export const getUserEmail = () => getItem(KEYS.USER_EMAIL, true);
export const setUserEmail = (value) => setItem(KEYS.USER_EMAIL, value);
