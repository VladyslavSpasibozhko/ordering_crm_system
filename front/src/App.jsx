import { RouterProvider } from './providers/Router';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider />
    </ChakraProvider>
  );
};
