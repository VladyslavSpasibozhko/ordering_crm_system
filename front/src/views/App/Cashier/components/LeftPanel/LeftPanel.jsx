import { Box } from '@chakra-ui/react';

export function LeftPanel({ children }) {
  return (
    <Box height="100vh" width="60%" display="flex" flexDirection="column">
      {children}
    </Box>
  );
}
