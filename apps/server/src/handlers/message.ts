import { MessageMessage, MessageResponse } from 'shared';

export const messageHandler = ({ data }: MessageMessage): MessageResponse => {
   console.log(`Message received: ${data.content}`);

   return {
      type: 'messageResponse',
      data: null,
   };
};
