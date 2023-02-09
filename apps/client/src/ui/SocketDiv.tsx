import { memo, useEffect } from 'react';
import { store } from '../store';

export const SocketDiv = memo(() => {
   useEffect(() => {
      if (store.socket === null) {
         store.setSocket(new WebSocket(import.meta.env.VITE_SERVER_WEBSOCKET_URL));
      }
   }, []);

   return <div />;
});
