import { HelloMessage, HelloSchemaResponse } from 'shared';

export const helloHandler = ({ data }: HelloMessage): HelloSchemaResponse => ({
   type: 'helloResponse',
   data: {
      response: `Hello back, ${data.name}!`,
   },
});
