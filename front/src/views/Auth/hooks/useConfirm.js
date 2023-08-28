import { useNavigate } from 'react-router-dom';
import { authService } from 'src/services/rest/auth';
import { useRequest } from 'src/hooks/useRequest';
import { setTokens, setUserEmail } from 'src/services/token';

export const useConfirm = () => {
  const navigate = useNavigate();
  const login = useRequest(authService.loginReq);
  const confirm = useRequest(authService.confirmReq);

  async function confirmReq(values) {
    const confirmRes = await confirm.trigger({ body: values });

    if (confirmRes.success) {
      const loginRes = await login.trigger({ body: values });

      if (loginRes.success) {
        setUserEmail(values.email);

        setTokens(
          loginRes.data.access,
          loginRes.data.refresh,
          loginRes.data.expiresIn,
        );

        navigate('/app');
      }

      if (!loginRes.success) {
        //TODO: Pass email via link
        navigate('/auth/login');
      }
    }
  }

  return {
    error: confirm.error || login.error,
    loading: confirm.loading || login.loading,
    confirm: confirmReq,
  };
};
