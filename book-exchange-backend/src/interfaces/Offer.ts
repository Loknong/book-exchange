export interface Offer {
  offerId: number;
  bookId: number;
  offeredBy: number;
  offeredTo: number;
  status: string;
  offerDetail?: string;
  createdAt: Date;
  updatedAt: Date;
}
