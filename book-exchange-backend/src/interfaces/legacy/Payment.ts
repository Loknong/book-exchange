export interface Payment {
    paymentId: number;
    transactionId: number;
    amount: number;
    status: "PENDING" | "COMPLETED" | "FAILED";
    evidence?: string;
    created_at: Date;
    updated_at: Date;
  }