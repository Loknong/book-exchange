export interface AdminManagement {
    managementId: number;
    offerId: number;
    bookId: number;
    transactionId: number;
    adminStatus: "RECEIVED" | "SENT_TO_USER" | "ISSUE";
    uniqueId: string;
    receivedAt: Date;
    sentAt?: Date;
    createdAt: Date;
    updatedAt: Date;
  }