import { PrismaClient } from "@prisma/client";
import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";
import {
  CreateNotificationRequest,
  UpdateNotificationRequest,
} from "@src/types";


export const createNotification = async (
  prisma: PrismaTransactionClient,
  data: CreateNotificationRequest
) => {
  const notification = await prisma.notifications.create({ data });
  return notification;
};

export const getNotificationById = async (prisma: PrismaTransactionClient, id: number) => {
  const notification = await prisma.notifications.findUnique({ where: { id } });
  return notification;
};

export const updateNotificaiton = async (
  prisma: PrismaTransactionClient,
  id: number,
  data: UpdateNotificationRequest
) => {
  const notification = await prisma.notifications.update({
    where: { id },
    data,
  });
  return notification;
};

export const deleteNotification = async (prisma: PrismaTransactionClient, id: number) => {
  const notification = await prisma.notifications.delete({ where: { id } });
  return notification;
};
