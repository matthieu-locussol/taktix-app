import { SumResponseSchema } from 'shared';

export const handleSumResponse = ({ data }: SumResponseSchema): void => {
   console.log(data.result);
};
