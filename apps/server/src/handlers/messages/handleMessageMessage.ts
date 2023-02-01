import { MessageMessage, MessageResponse } from 'shared';

export const handleMessageMessage = ({ data }: MessageMessage): MessageResponse => {
   console.log(`Message received: ${data.content}`);

   return {
      type: 'messageResponse',
      data: null,
   };
};
