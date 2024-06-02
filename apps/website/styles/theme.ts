import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
   palette: {
      primary: {
         main: '#115E59',
         light: '#14B8A6',
      },
      secondary: {
         main: '#111827',
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
});
