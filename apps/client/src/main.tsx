import React from 'react';
import ReactDOM from 'react-dom/client';
import './game/PhaserGame';
import './styles/globals.css';
import { Game } from './ui/Game';
import { Layout } from './ui/layouts/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Layout>
         <Game />
      </Layout>
   </React.StrictMode>,
);
