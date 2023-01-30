import { HelloSchema } from 'shared';

export const helloHandler = ({ data }: HelloSchema): string =>
   JSON.stringify({ response: `Hello, ${data.name}!` });
