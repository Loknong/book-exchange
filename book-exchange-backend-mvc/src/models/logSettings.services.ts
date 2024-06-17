import { PrismaClient } from "@prisma/client";
import { CreateLogSettingRequest, UpdateLogSettingRequest } from "@src/types";

export const createLogSettings = async (
  prisma: PrismaClient,
  data: CreateLogSettingRequest
) => {
  const logSetting = await prisma.logSettings.create({ data });
  return logSetting;
};

export const getLogSettingById = async (prisma: PrismaClient, id: number) => {
  const logSetting = await prisma.logSettings.findUnique({ where: { id } });
  return logSetting;
};

export const updateLogSetting = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateLogSettingRequest
) => {
  const logSetting = await prisma.logSettings.update({ where: { id }, data });
  return logSetting;
};

export const deleteLogSetting = async (prisma: PrismaClient, id: number) => {
  const logSetting = await prisma.logSettings.delete({ where: { id } });
};
