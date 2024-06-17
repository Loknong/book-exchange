import { PrismaClient } from '@prisma/client';
import { CreateOfferRequest, UpdateOfferRequest, OfferResponse } from '../types';

export const createOffer = async (prisma: PrismaClient, data: CreateOfferRequest) => {
  const offer = await prisma.offers.create({ data });
  return offer;
};

export const getOfferById = async (prisma: PrismaClient, id: number) => {
  const offer = await prisma.offers.findUnique({ where: { id } });
  return offer;
};

export const updateOffer = async (prisma: PrismaClient, id: number, data: UpdateOfferRequest) => {
  const offer = await prisma.offers.update({ where: { id }, data });
  return offer;
};

export const deleteOffer = async (prisma: PrismaClient, id: number) => {
  const offer = await prisma.offers.delete({ where: { id } });
  return offer;
};
