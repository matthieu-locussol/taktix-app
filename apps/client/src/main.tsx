import { invoke } from '@tauri-apps/api';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

setTimeout(() => {
   invoke('close_splashscreen');

   ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
         <App />
      </React.StrictMode>,
   );
}, 5000);
