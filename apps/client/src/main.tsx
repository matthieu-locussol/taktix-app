import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './game/PhaserGame';
import { appTheme } from './styles/appTheme';
import './styles/globals.css';
import { Game } from './ui/Game';
import { GameBackground } from './ui/GameBackground';
import { Layout } from './ui/layouts/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <ThemeProvider theme={appTheme}>
         <Layout>
            <GameBackground />
            <Game />
         </Layout>
      </ThemeProvider>
   </React.StrictMode>,
);
