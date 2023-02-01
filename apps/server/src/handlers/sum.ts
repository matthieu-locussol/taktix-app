import { SumMessage, SumResponse } from 'shared';

export const sumHandler = ({ data }: SumMessage): SumResponse => ({
   type: 'sumResponse',
   data: {
      result: data.operand1 + data.operand2,
   },
});
