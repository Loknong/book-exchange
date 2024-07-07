import { TransactionStatus, OfferStatus, PaymentStatus } from "@prisma/client";

export interface Transaction {
  id: number;
  offerId: number;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionRequest {
  offerId: number;
  status: TransactionStatus;
}

export interface UpdateTransactionRequest {
  offerId?: number;
  status?: TransactionStatus;
}

export interface TransactionResponse {
  id: number;
  offerId: number;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface Payment {
  id: number;
  userId: number;
  transactionId: number;
  amount: number;
  status: PaymentStatus;
  evidence: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
  userId: number;
  transactionId: number;
  amount: number;
  status: PaymentStatus;
  evidence: string;
}

export interface UpdatePaymentRequest {
  userId?: number;
  transactionId?: number;
  amount?: number;
  status?: PaymentStatus;
  evidence?: string;
}

export interface PaymentResponse {
  id: number;
  userId: number;
  transactionId: number;
  amount: number;
  status: PaymentStatus;
  evidence: string;
  createdAt: Date;
  updatedAt: Date;
}
