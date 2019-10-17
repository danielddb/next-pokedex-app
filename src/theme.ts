import { createMuiTheme } from '@material-ui/core';

export const createTheme = (paletteType: 'light' | 'dark' = 'light') =>
  createMuiTheme({
    palette: {
      type: paletteType
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  });
