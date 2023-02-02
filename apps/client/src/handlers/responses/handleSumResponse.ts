import { SumResponse } from 'shared';

export const handleSumResponse = ({ data }: SumResponse): void => {
   console.log(data.result);
};
