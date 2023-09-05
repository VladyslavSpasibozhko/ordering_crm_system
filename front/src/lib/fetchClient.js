import { useState } from 'react';
import { errorToString } from 'src/utils/errorToString';

// TODO: Move to env
const base = 'http://localhost:8080/api';

export const fetch = async ({ method, url, headers, body }) => {
  const _url = base + url;

  return window
    .fetch(_url, { method, headers, body })
    .then((res) => res.json())
    .catch((err) => err);
};

export const useRequest = (fn, options = { loading: false, error: null }) => {
  const [loading, setLoading] = useState(options.loading || false);
  const [error, setError] = useState(options.error || null);

  async function request(...args) {
    setLoading(true);
    setError(null);

    try {
      const res = await fn(...args);

      if ('success' in res) {
        if (!res.success) {
          throw Error(errorToString(res));
        }
      }

      return res;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, request };
};
