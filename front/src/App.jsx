import { RouterProvider } from './router';
import { ThemeProvider } from 'react-ui';
import { tokens, components } from 'react-ui/themes/light';

export const App = () => {
  return (
    <ThemeProvider tokens={tokens} components={components}>
      <RouterProvider />
    </ThemeProvider>
  );
};
