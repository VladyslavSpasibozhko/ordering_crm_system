import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  setAccessToken,
  setExpiresIn,
  retrieveTokens,
  isExpired,
} from 'src/services/token';
import { refreshTokenReq } from 'src/services/rest/auth/service';

export const Root = () => {
  const navigate = useNavigate();

  const checkAccessToken = () => {
    const { accessToken, refreshToken } = retrieveTokens();

    if (accessToken) {
      const _isExpired = isExpired();

      if (_isExpired) {
        refreshTokenMethod(refreshToken);
      } else {
        navigate('/app');
      }
    }

    if (!accessToken) {
      if (refreshToken) refreshTokenMethod(refreshToken);

      if (!refreshToken) {
        navigate('/auth/login');
      }
    }
  };

  const refreshTokenMethod = async (token) => {
    const res = await refreshTokenReq({ body: { token } });

    if (res.success) {
      setAccessToken(res.data.token);
      setExpiresIn(res.data.expiresIn);
      navigate('/app');
    }

    if (!res.success) {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  return <Outlet />;
};
