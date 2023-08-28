import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function Auth() {
  return (
    <Box height="100vh" width="100vw">
      <Outlet />
    </Box>
  );
}
