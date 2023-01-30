import { MessageSchema } from 'shared';

export const messageHandler = ({ data }: MessageSchema): string => {
   console.log(`Message received: ${data.content}`);
   return JSON.stringify({ response: `Responding to message: "${data.content}".` });
};
