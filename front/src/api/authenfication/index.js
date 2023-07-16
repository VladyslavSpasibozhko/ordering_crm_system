export const login = ({ body }) => ({
  url: '/login/',
  method: 'POST',
  body: JSON.stringify(body),
});

export const register = ({ body }) => ({
  url: '/register/',
  method: 'POST',
  body: JSON.stringify(body),
});

export const check_token = ({ body }) => ({
  url: '/check_token/',
  method: 'POST',
  body: JSON.stringify(body),
});

export const refresh_token = ({ body }) => ({
  url: '/refresh_token/',
  method: 'POST',
  body: JSON.stringify(body),
});
