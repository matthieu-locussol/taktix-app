import { HelloMessage, HelloResponse } from 'shared';

export const handleHelloMessage = ({ data }: HelloMessage): HelloResponse => ({
   type: 'helloResponse',
   data: {
      response: `Hello back, ${data.name}!`,
   },
});
