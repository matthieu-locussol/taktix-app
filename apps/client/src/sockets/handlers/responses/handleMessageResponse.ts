import { MessageResponse } from 'shared';

export const handleMessageResponse = ({ data }: MessageResponse): void => {
   console.log(data);
};
