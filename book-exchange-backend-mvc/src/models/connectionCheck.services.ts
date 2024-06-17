import { PrismaClient } from '@prisma/client';
import { CreateConnectionCheckRequest, UpdateConnectionCheckRequest, ConnectionCheckResponse } from '../types';

export const createConnectionCheck = async (prisma: PrismaClient, data: CreateConnectionCheckRequest): Promise<ConnectionCheckResponse> => {
  const connectionCheck = await prisma.connectionChecks.create({ data });
  return connectionCheck;
};

export const getConnectionCheckById = async (prisma: PrismaClient, id: number): Promise<ConnectionCheckResponse | null> => {
  const connectionCheck = await prisma.connectionChecks.findUnique({ where: { id } });
  return connectionCheck;
};

export const updateConnectionCheck = async (prisma: PrismaClient, id: number, data: UpdateConnectionCheckRequest): Promise<ConnectionCheckResponse> => {
  const connectionCheck = await prisma.connectionChecks.update({ where: { id }, data });
  return connectionCheck;
};

export const deleteConnectionCheck = async (prisma: PrismaClient, id: number): Promise<ConnectionCheckResponse> => {
  const connectionCheck = await prisma.connectionChecks.delete({ where: { id } });
  return connectionCheck;
};
