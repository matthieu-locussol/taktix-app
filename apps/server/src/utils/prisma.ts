import { PrismaClient } from '@prisma/client';

type CustomGlobal = typeof globalThis & {
   prisma?: PrismaClient;
};

declare const global: CustomGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
   global.prisma = prisma;
}

export { prisma };
