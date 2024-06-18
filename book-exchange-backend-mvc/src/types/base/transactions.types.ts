import { TransactionStatus } from "@prisma/client";
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

// export enum TransactionStatus {
//   PENDING = "PENDING",
//   CONFIRMED = "CONFIRMED",
//   CANCELED = "CANCELED",
//   PAYMENT_PENDING = "PAYMENT_PENDING",
//   PAYMENT_IN_PROGRESS = "PAYMENT_IN_PROGRESS",
//   PAYMENT_COMPLETED = "PAYMENT_COMPLETED",
//   PAYMENT_FAILED = "PAYMENT_FAILED",
//   ADDRESS_SENT = "ADDRESS_SENT",
//   BOOK_RECEIVED = "BOOK_RECEIVED",
//   SEND_BOOK_COMPLETED = "SEND_BOOK_COMPLETED",
//   SEND_BOOK_TO_USER = "SEND_BOOK_TO_USER",
//   COMPLETED = "COMPLETED",
// }
