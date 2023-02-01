import { PingResponse } from 'shared';

export const handlePingResponse = ({ data }: PingResponse): void => {
   console.log(data.message);
};
