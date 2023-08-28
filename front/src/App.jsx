import { RouterProvider } from './router';
import { ChakraProvider } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider />
    </ChakraProvider>
  );
};
