import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

type CustomGlobal = typeof globalThis & {
   prisma?: ReturnType<typeof prismaClientSingleton>
}

declare const global: CustomGlobal

const prismaClientSingleton = () => new PrismaClient().$extends(withAccelerate())

export const prisma = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
