import { PingResponse, PingSchema } from 'shared';

export const handlePing = ({ data }: PingSchema): PingResponse => {
   console.log(data.message);

   return {
      type: 'pingResponse',
      data: {
         message: 'Pong!',
      },
   };
};
