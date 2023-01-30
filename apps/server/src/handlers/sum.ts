import { SumSchema } from 'shared';

export const sumHandler = ({ data }: SumSchema): string => {
   const result = data.operand1 + data.operand2;
   return JSON.stringify({ result });
};
