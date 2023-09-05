import { Box, Divider } from '@chakra-ui/react';
import { RightPanel } from './RightPanel';
import { LeftPanel } from './LeftPanel';

export function WorkplaceLayout({ children }) {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LeftPanel>{children}</LeftPanel>
      <Divider orientation="vertical" />
      <RightPanel />
    </Box>
  );
}
