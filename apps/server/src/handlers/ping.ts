import { PingResponse } from 'shared';

export const pingHandler = ({ data }: PingResponse): void => {
   console.log(data.message);
};
