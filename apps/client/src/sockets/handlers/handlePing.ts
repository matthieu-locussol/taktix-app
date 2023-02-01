import { PingMessage, PingResponse } from 'shared';

export const handlePing = ({ data }: PingMessage): PingResponse => {
   console.log(data.message);

   return {
      type: 'pingResponse',
      data: {
         message: 'Pong!',
      },
   };
};
