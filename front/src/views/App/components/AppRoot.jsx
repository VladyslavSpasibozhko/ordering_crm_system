import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { UrqlProvider } from 'src/components/Urql';

export function AppRoot() {
  return (
    <UrqlProvider>
      <Box height="100vh" width="100vw">
        <Outlet />
      </Box>
    </UrqlProvider>
  );
}
