const base = 'http://localhost:8080/';

export const fetch = async ({ method, url, headers, body }) => {
  const _url = base + url;

  return window
    .fetch(_url, { method, headers, body })
    .then((res) => res.json())
    .catch((err) => err);
};
