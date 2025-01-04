import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './game/PhaserGame.ts';
import { appTheme } from './styles/appTheme.tsx';
import './styles/globals.css';
import { Game } from './ui/Game.tsx';
import { Layout } from './ui/layouts/Layout.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <ThemeProvider theme={appTheme}>
         <Layout>
            <Game />
         </Layout>
      </ThemeProvider>
   </React.StrictMode>,
);
