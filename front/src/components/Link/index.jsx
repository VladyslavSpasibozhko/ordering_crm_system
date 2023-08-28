import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export function Link({ children, to, ...rest }) {
  return (
    <ChakraLink as={RouterLink} to={to} {...rest}>
      {children}
    </ChakraLink>
  );
}
