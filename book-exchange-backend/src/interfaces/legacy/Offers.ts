export interface Offer {
  offerId: number;
  bookId: number;
  offeredBy: number;
  offeredTo: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  offerDetails?: string;
  created_at: Date;
  updated_at: Date;
}

export interface OfferList {
  offers: Offer[];
}
