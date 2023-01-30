import { HelloSchema, MessageSchema, SumSchema } from 'shared';

export const sendHello = (socket: WebSocket, name: string) => {
   const payload: HelloSchema = {
      type: 'hello',
      data: {
         name,
      },
   };

   socket.send(JSON.stringify(payload));
};

export const sendMessage = (socket: WebSocket, content: string) => {
   const payload: MessageSchema = {
      type: 'message',
      data: {
         content,
      },
   };

   socket.send(JSON.stringify(payload));
};

export const sendSum = (socket: WebSocket, operand1: string, operand2: string) => {
   const payload: SumSchema = {
      type: 'sum',
      data: {
         operand1: Number.parseInt(operand1, 10),
         operand2: Number.parseInt(operand2, 10),
      },
   };

   socket.send(JSON.stringify(payload));
};
