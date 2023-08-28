export const login = ({ body }) => ({
  url: '/auth/login/',
  method: 'POST',
  body: JSON.stringify(body),
});

export const confirm = ({ body }) => ({
  url: '/auth/confirm/',
  method: 'POST',
  body: JSON.stringify(body),
});

export const check_token = ({ body }) => ({
  url: '/auth/check_token/',
  method: 'POST',
  body: JSON.stringify(body),
});

export const refresh_token = ({ body }) => ({
  url: '/auth/refresh_token/',
  method: 'POST',
  body: JSON.stringify(body),
});
