import { HelloSchema, HelloSchemaResponse } from 'shared';

export const helloHandler = ({ data }: HelloSchema): HelloSchemaResponse => ({
   type: 'helloResponse',
   data: {
      response: `Hello back, ${data.name}!`,
   },
});
