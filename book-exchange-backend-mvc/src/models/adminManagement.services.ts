import { PrismaClient } from "@prisma/client";
import {
  AdminManagementResponse,
  CreateAdminManagementRequest,
  UpdateAdminManagementRequest,
} from "../types/base/adminManagement.types";

export const craeteAdminEvent = async (
  prisma: PrismaClient,
  data: CreateAdminManagementRequest
) => {
  const adminEvent = await prisma.adminManagement.create({ data });
  return adminEvent;
};

export const getAdminEventById = async (prisma: PrismaClient, id: number) => {
  const adminEvent = await prisma.adminManagement.findUnique({ where: { id } });
  return adminEvent;
};

export const updateAdminEvent = async (
  prisma: PrismaClient,
  id: number,
  data: UpdateAdminManagementRequest
) => {
  const adminEvent = await prisma.adminManagement.update({
    where: { id },
    data,
  });
  return adminEvent;
};

export const deleteAdminEvent = async (prisma: PrismaClient, id: number) => {
  const adminEvent = await prisma.adminManagement.delete({ where: { id } });
  return adminEvent;
};
