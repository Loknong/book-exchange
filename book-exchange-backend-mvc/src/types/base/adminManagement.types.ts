export interface AdminManagement {
  id: number;
  transactionId: number;
  status: AdminStatus;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAdminManagementRequest {
  transactionId: number;
  status: AdminStatus;
  details?: string;
}

export interface UpdateAdminManagementRequest {
  transactionId?: number;
  status?: AdminStatus;
  details?: string;
}

export interface AdminManagementResponse {
  id: number;
  transactionId: number;
  status: AdminStatus;
  details: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum AdminStatus {
  CHECKING_PAYMENT_EVIDENCE = "CHECKING_PAYMENT_EVIDENCE",
  CHECKED_PAYMENT_COMPLETED = "CHECKED_PAYMENT_COMPLETED",
  SENDING_ADDRESS = "SENDING_ADDRESS",
  WAITING_BOOK = "WAITING_BOOK",
  RECEIVED_BOOK = "RECEIVED_BOOK",
  SENDING_BOOK_TO_USER = "SENDING_BOOK_TO_USER",
  COMPLETED = "COMPLETED",
}
