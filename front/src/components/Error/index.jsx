import { Box, Text } from '@chakra-ui/react';

export const Error = ({ error, ...rest }) => {
  return (
    <Box {...rest}>
      <Text color="red.600">{error}</Text>
    </Box>
  );
};
