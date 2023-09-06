import { UrqlProvider } from 'src/providers/Urql';
import { useEffect } from 'react';
import { useRequest } from 'src/lib/fetchClient';
import { authFeatures } from 'src/features/auth';
import { useAuthStore } from 'src/stores/auth.store';
import { Loader } from 'src/components/Loader';

export function AppRoot() {
  const { request, loading } = useRequest(authFeatures.loadUserFeature, {
    loading: true,
  });

  const email = useAuthStore((state) => state.email);

  useEffect(() => {
    if (email) request(email);
  }, []);

  if (loading) return <Loader />;

  return <UrqlProvider></UrqlProvider>;
}
