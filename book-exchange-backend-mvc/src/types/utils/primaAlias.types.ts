import { PrismaClient, Prisma } from '@prisma/client';

export type PrismaTransactionClient = PrismaClient | Prisma.TransactionClient;
