import { useNavigate } from 'react-router-dom';
import { authService } from 'src/services/rest/auth';
import { useRequest } from 'src/hooks/useRequest';
import { setTokens, setUserEmail } from 'src/services/token';

export const useLogin = () => {
  const navigate = useNavigate();
  const { trigger, ...rest } = useRequest(authService.loginReq);

  async function login(values) {
    const response = await trigger({ body: values });

    if (response.success) {
      setUserEmail(values.email);

      setTokens(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.expiresIn,
      );

      navigate('/app');
    }
  }

  return {
    ...rest,
    login,
  };
};
