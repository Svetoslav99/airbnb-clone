import { PrismaClient } from '@prisma/client';

/**
 * nextjs 13 hot reaload can create a bunch of new Prisma client instances
 * to be created giving us a warning in the terminal of multiple instances.
 * This way we assign the PrismaClient to a the global, which is not affected
 * by the hot reload.
 * 
 * This is best practice for using prisma client with next13.
 */

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;
