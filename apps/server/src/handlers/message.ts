import { MessageResponseSchema, MessageSchema } from 'shared';

export const messageHandler = ({ data }: MessageSchema): MessageResponseSchema => {
   console.log(`Message received: ${data.content}`);

   return {
      type: 'messageResponse',
      data: null,
   };
};
