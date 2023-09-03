import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { UrqlProvider } from 'src/components/Urql';
import { useEffect } from 'react';

export function AppRoot() {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: FIX IT
    navigate('/app/workplace');
  }, []);

  return (
    <UrqlProvider>
      <Box height="100vh" width="100vw">
        <Outlet />
      </Box>
    </UrqlProvider>
  );
}
