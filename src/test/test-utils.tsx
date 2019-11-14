import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '../../src/theme';

const theme = createTheme();

const AllTheProviders: React.FC<{
  router?: any;
}> = ({ children, router }) => {
  const routerValue = router
    ? router
    : {
        pathname: '/',
        route: '/'
      };

  return (
    <RouterContext.Provider value={routerValue}>
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    </RouterContext.Provider>
  );
};

const customRender = (ui: any, wrapperProps?: any) =>
  render(ui, {
    wrapper: props => <AllTheProviders {...wrapperProps} {...props} />
  });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
