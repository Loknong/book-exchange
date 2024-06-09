export interface Offer {
  offerId: number;
  bookId: number;
  offeredBy: number;
  offeredTo: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  offerDetail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferCreate {
  bookId: number;
  offeredBy: number;
  offeredTo: number;
  offerDetails?: string;
}

export interface OfferUpdate {
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  offerDetails?: string;
}