import { PrismaClient } from '@prisma/client';
import { PrismaTransactionClient } from '@src/types/utils/primaAlias.types';
import { CreateOfferRequest, UpdateOfferRequest, OfferResponse } from '../types';

export const createOffer = async (prisma: PrismaTransactionClient, data: CreateOfferRequest) => {
  const offer = await prisma.offers.create({ data });
  return offer;
};

export const getOfferById = async (prisma: PrismaTransactionClient, id: number) => {
  const offer = await prisma.offers.findUnique({ where: { id } });
  return offer;
};

export const updateOffer = async (prisma: PrismaTransactionClient, id: number, data: UpdateOfferRequest) => {
  const offer = await prisma.offers.update({ where: { id }, data });
  return offer;
};

export const deleteOffer = async (prisma: PrismaTransactionClient, id: number) => {
  const offer = await prisma.offers.delete({ where: { id } });
  return offer;
};
