import { MessageResponseSchema } from 'shared';

export const handleMessageResponse = ({ data }: MessageResponseSchema): void => {
   console.log(data);
};
