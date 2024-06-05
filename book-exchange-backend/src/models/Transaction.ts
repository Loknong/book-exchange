export interface Transaction {
    transactionId: number;
    offerId: number;
    status: "PENDING" | "COMPLETED" | "CANCELED";
    created_at: Date;
    updated_at: Date;
  }