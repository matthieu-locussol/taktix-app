import { SumMessage, SumResponse } from 'shared';

export const handleSumMessage = ({ data }: SumMessage): SumResponse => ({
   type: 'sumResponse',
   data: {
      result: data.operand1 + data.operand2,
   },
});
