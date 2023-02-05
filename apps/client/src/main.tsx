import React from 'react';
import ReactDOM from 'react-dom/client';
import './game/PhaserGame';
import './styles/globals.css';
import { Game } from './ui/Game';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Game />
   </React.StrictMode>,
);
