import { PrismaClient } from '@prisma/client';
import { PrismaTransactionClient } from '@src/types/utils/primaAlias.types';
import { CreateConnectionCheckRequest, UpdateConnectionCheckRequest, ConnectionCheckResponse } from '../types';

export const createConnectionCheck = async (prisma: PrismaTransactionClient, data: CreateConnectionCheckRequest): Promise<ConnectionCheckResponse> => {
  const connectionCheck = await prisma.connectionChecks.create({ data });
  return connectionCheck;
};

export const getConnectionCheckById = async (prisma: PrismaTransactionClient, id: number): Promise<ConnectionCheckResponse | null> => {
  
  const connectionCheck = await prisma.connectionChecks.findUnique({ where: { id } });
  return connectionCheck;
};

export const updateConnectionCheck = async (prisma: PrismaTransactionClient, id: number, data: UpdateConnectionCheckRequest): Promise<ConnectionCheckResponse> => {
  const connectionCheck = await prisma.connectionChecks.update({ where: { id }, data });
  return connectionCheck;
};

export const deleteConnectionCheck = async (prisma: PrismaTransactionClient, id: number): Promise<ConnectionCheckResponse> => {
  const connectionCheck = await prisma.connectionChecks.delete({ where: { id } });
  return connectionCheck;
};