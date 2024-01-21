import { RequestHandler } from 'express';
import { zRegisterSchema } from 'shared';
import { hashPassword } from '../utils/hashPassword';
import { prisma } from '../utils/prisma';

export const registerRouter: RequestHandler = async (req, res) => {
   const { email, password, username } = zRegisterSchema.parse(req.body);

   const [userByEmail, userByUsername] = await Promise.all([
      prisma.user.findFirst({
         where: {
            email,
         },
      }),
      prisma.user.findFirst({
         where: {
            username,
         },
      }),
   ]);

   if (userByEmail) {
      res.status(400).send({ error: 'Email already in use!' });
      return;
   }

   if (userByUsername) {
      res.status(400).send({ error: 'Username already in use!' });
      return;
   }

   const hashedPassword = await hashPassword(password);

   await prisma.user.create({
      data: {
         email,
         username,
         password: hashedPassword,
      },
   });

   res.status(200).send({ success: true });
};
