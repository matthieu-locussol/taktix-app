import { createTheme } from '@mui/material';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#236348',
      },
      secondary: {
         main: '#333333',
      },
      error: {
         main: '#EF4444',
      },
      text: {
         primary: '#464646',
         secondary: '#868686',
      },
      mode: 'light',
   },
   typography: {
      fontFamily: ['Open Sans'].join(','),
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: 'none',
            },
         },
      },
   },
});
