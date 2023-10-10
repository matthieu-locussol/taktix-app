import { ClientPacketType } from 'shared';
import { state } from '../../state';
import { hashPassword } from '../../utils/hashPassword';
import { prisma } from '../../utils/prisma';
import { SocketId } from '../../utils/socketId';

export const handleLogin = async (
   { username, password }: ClientPacketType<'login'>,
   socketId: SocketId,
) => {
   const client = state.getClient(socketId);
   const hashedPassword = await hashPassword(password);

   const user = await prisma.user.findUnique({
      where: { username, password: hashedPassword },
      include: { characters: true },
   });

   if (!user) {
      client.socket.send({
         type: 'loginResponse',
         response: {
            status: 'error',
            errorMessage: `Incorrect credentials for user "${username}"!`,
         },
      });
      return;
   }

   const existingClient = state.getClientFromUsername(username);
   if (existingClient) {
      const [existingSocketId] = existingClient;
      state.disconnectClient(existingSocketId);
   }

   client.socket.send({
      type: 'loginResponse',
      response: {
         status: 'success',
         characters: user.characters.map(({ name }) => ({ name })),
      },
   });

   client.username = user.username;
};
