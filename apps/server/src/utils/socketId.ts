import { v4 as uuidv4 } from 'uuid';

export type SocketId = string & { brand: 'SocketId' };

export const makeSocketId = (): SocketId => {
   const uuid = uuidv4();
   return uuid as SocketId;
};
