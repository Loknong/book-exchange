import { OfferStatus } from "@prisma/client";

export interface CreateOffer {
  bookId: number;
  offeredById: number;
  offeredToId: number;
  details?: string | null;
  status: OfferStatus;
}

export interface UpdateOffer {
    status: OfferStatus;
}