import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function AppRoot() {
  return (
    <Box height="100vh" width="100vw">
      APP ROOT
      <Outlet />
    </Box>
  );
}
