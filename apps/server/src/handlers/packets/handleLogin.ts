import { ClientPacketType, _assertTrue } from 'shared';
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

   const users = await prisma.user.findMany({
      where: { username, password: hashedPassword },
      include: { characters: true },
   });
   _assertTrue(users.length <= 1, 'More than one user found!');
   const user = users[0];

   if (!user) {
      client.socket.send({
         type: 'loginResponse',
         response: {
            status: 'user_not_found',
         },
      });
      return;
   }

   client.socket.send({
      type: 'loginResponse',
      response: {
         status: 'user_found',
         characters: user.characters.map(({ name }) => ({ name })),
      },
   });

   client.username = user.username;
};
