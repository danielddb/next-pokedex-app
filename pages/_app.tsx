import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider
} from '@material-ui/styles';
import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createTheme } from '../src/theme';

const CustomComponent: React.FC<{}> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () => createTheme(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode]
  );

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <>{children}</>
        </ThemeProvider>
      </MaterialThemeProvider>
    </StylesProvider>
  );
};

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <CustomComponent>
        <Component {...pageProps} />
      </CustomComponent>
    );
  }
}
