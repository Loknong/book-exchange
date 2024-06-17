import { PrismaClient } from "@prisma/client";
import { CreatePaymentRequest, UpdatePaymentRequest } from "@src/types";

export const createPayment = async (
  prisma: PrismaClient,
  data: CreatePaymentRequest
) => {
  const payment = await prisma.payments.create({ data });
  return payment;
};

export const getPaymentById = async (prisma: PrismaClient, id: number) => {
  const payment = await prisma.payments.findUnique({ where: { id } });
  return payment;
};

export const updatePayment = async (
  prisma: PrismaClient,
  id: number,
  data: UpdatePaymentRequest
) => {
  const payment = await prisma.payments.update({ where: { id }, data });
  return payment;
};

export const deletePayment = async (prisma: PrismaClient, id: number) => {
  const payment = await prisma.payments.delete({ where: { id } });
  return payment;
};
