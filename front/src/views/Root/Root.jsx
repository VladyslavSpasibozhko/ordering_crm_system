import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { authFeatures } from 'src/features/auth';
import { useRequest } from 'src/lib/fetchClient';
import { subscribeAuth } from 'src/stores/auth.store';
import { Loader } from 'src/components/Loader';

export const Root = () => {
  const navigate = useNavigate();
  const { loading, request } = useRequest(authFeatures.initTokenFeature, {
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = subscribeAuth((state, prevState) => {
      if (state.loggedIn === prevState.loggedIn) return;

      if (state.loggedIn) navigate('/app');
      else navigate('/auth');
    });

    request();

    return () => unsubscribe();
  }, []);

  if (loading) return <Loader />;

  return <Outlet />;
};
