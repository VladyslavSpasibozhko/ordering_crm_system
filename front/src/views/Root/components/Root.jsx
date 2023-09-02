import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';
import { authFeatures } from 'src/features/auth';

export const Root = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    authFeatures.initTokenFeature().then((state) => {
      navigate(state.path);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return <Outlet />;
};
