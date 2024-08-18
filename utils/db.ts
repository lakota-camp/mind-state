import { PrismaClient } from '@prisma/client';
// globalThis: the global space
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  // Check if prisma is there
  globalForPrisma.prisma ??
  // Create new connection to DB
  new PrismaClient({
    log: ['query'],
  });

// if not in production, add to prisma
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
