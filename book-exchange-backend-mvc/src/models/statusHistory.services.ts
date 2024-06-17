import { PrismaClient } from "@prisma/client";
import {
  CreateStatusHistoryRequest,
  UpdateStatusHistoryRequest,
} from "@src/types";

export const createStatusHistory = async (
  prisma: PrismaClient,
  data: CreateStatusHistoryRequest
) => {
  const statusHistory = await prisma.statusHistory.create({ data });
  return statusHistory;
};

export const getStatusHistoryById = async (
  prisma: PrismaClient,
  id: number
) => {
  const statusHistory = await prisma.statusHistory.findUnique({
    where: { id },
  });
  return statusHistory;
};

export const updateStatusHistory = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateStatusHistoryRequest
) => {
  const statusHistory = await prisma.statusHistory.update({
    where: { id },
    data,
  });
  return statusHistory;
};

export const deleteStatusHistory = async (prisma: PrismaClient, id: number) => {
  const statusHistory = await prisma.statusHistory.delete({ where: { id } });
  return statusHistory;
};
