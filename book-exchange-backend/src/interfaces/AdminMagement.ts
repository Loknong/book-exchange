export interface AdminManagement {
  managementId: number;
  offerId: number;
  bookId: number;
  adminStatus: "RECEIVED" | "SENT_TO_USER" | "ISSUE";
  uniquedId: number;
  createdAt: Date;
  updatedAt: Date;
}
