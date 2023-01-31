import { SumResponseSchema, SumSchema } from 'shared';

export const sumHandler = ({ data }: SumSchema): SumResponseSchema => ({
   type: 'sumResponse',
   data: {
      result: data.operand1 + data.operand2,
   },
});
