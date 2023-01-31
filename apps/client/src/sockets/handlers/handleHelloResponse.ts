import { HelloSchemaResponse } from 'shared';

export const handleHelloResponse = ({ data }: HelloSchemaResponse): void => {
   console.log(data.response);
};
