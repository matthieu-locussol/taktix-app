import { ClientPacketType } from 'shared';
import { state } from '../../state';
import { hashPassword } from '../../utils/hashPassword';
import { prisma } from '../../utils/prisma';
import { SocketId } from '../../utils/socketId';

export const handleDeleteCharacter = async (
   { name, password }: ClientPacketType<'deleteCharacter'>,
   socketId: SocketId,
) => {
   const client = state.getClient(socketId);
   const hashedPassword = await hashPassword(password);

   const user = await prisma.user.findFirst({
      where: {
         username: client.username,
         password: hashedPassword,
      },
      include: { characters: true },
   });

   if (!user) {
      client.socket.send({
         type: 'deleteCharacterResponse',
         response: {
            status: 'error',
            errorMessage: 'Invalid password',
         },
      });
      return;
   }

   if (!user.characters.some((entry) => entry.name === name)) {
      client.socket.send({
         type: 'deleteCharacterResponse',
         response: {
            status: 'error',
            errorMessage: 'Character does not exist',
         },
      });
      return;
   }

   await prisma.character.delete({
      where: { name },
   });

   client.socket.send({
      type: 'deleteCharacterResponse',
      response: {
         status: 'success',
         characters: user.characters
            .filter((entry) => entry.name !== name)
            .map((entry) => ({ name: entry.name })),
      },
   });
};
