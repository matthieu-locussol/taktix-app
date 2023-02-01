import { HelloResponse } from 'shared';

export const handleHelloResponse = ({ data }: HelloResponse): void => {
   console.log(data.response);
};
