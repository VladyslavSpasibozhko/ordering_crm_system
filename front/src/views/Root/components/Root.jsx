import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authFeatures } from 'src/features/auth';
import { useRequest } from 'src/lib/fetchClient';
import { subscribeAuth } from 'src/stores/auth.store';
import { Loader } from 'src/components/Loader';

export const Root = () => {
  const { loading, request } = useRequest(authFeatures.initTokenFeature, {
    loading: true,
    error: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    // TODO: clear on on mount
    subscribeAuth((state) => {
      if (state.loggedIn) navigate('/app/workplace');
      else navigate('/auth/login');
    });

    request();
  }, []);

  if (loading) return <Loader />;

  return <Outlet />;
};
