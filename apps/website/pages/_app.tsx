import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../styles/theme.ts';

const MyApp = ({ Component, pageProps }: AppProps) => (
   <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
   </ThemeProvider>
);

export default MyApp;
