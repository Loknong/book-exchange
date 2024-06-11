export interface Transaction {
  transactionId: number;
  offerId: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PAYMENT_PENDING"
    | "PAYMENT_IN_PROGRESS"
    | "PAYMENT_COMPLETED"
    | "PAYMENT_FAILED"
    | "ADDRESS_SENT"
    | "BOOK_RECEIVED"
    | "BOOK_PROCESSING"
    | "COMPLETED"
    | "CANCELED";
  craetedAt: Date;
  updatedAt: Date;
}
