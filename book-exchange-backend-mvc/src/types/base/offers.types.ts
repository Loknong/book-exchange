export interface Offer {
    id: number;
    bookId: number;
    offeredById: number;
    offeredToId: number;
    status: OfferStatus;
    details: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface CreateOfferRequest {
    bookId: number;
    offeredById: number;
    offeredToId: number;
    status: OfferStatus;
    details: string;
  }
  
  export interface UpdateOfferRequest {
    bookId?: number;
    offeredById?: number;
    offeredToId?: number;
    status?: OfferStatus;
    details?: string;
  }
  
  export interface OfferResponse {
    id: number;
    bookId: number;
    offeredById: number;
    offeredToId: number;
    status: OfferStatus;
    details: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export enum OfferStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
  }
  