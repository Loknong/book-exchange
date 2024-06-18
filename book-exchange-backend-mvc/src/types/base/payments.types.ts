import { PaymentStatus } from "@prisma/client";
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

// export enum PaymentStatus {
//   PENDING = 'PENDING',
//   COMPLETED = 'COMPLETED',
//   FAILED = 'FAILED'
// }
