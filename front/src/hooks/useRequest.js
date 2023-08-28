import { useState } from 'react';

export const useRequest = (request) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const trigger = async (...params) => {
    setLoading(true);
    setError('');

    const response = await request(...params);

    if (!response.success) {
      const message = response.errors.map(({ message }) => message).join('; ');
      setError(message);
    }

    setLoading(false);
    return response;
  };

  return { error, loading, trigger };
};
