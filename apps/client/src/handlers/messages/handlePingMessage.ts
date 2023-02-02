import { PingMessage, PingResponse } from 'shared';

export const handlePingMessage = ({ data }: PingMessage): PingResponse => {
   console.log(data.message);

   return {
      type: 'pingResponse',
      data: {
         message: 'Pong!',
      },
   };
};
