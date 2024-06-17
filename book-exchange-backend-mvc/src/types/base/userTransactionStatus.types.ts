export interface UserTransactionStatus {
  id: number;
  transactionId: number;
  userId: number;
  status: UserTranStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserTransactionStatusRequest {
  transactionId: number;
  userId: number;
  status: UserTranStatus;
}

export interface UpdateUserTransactionStatusRequest {
  transactionId?: number;
  userId?: number;
  status?: UserTranStatus;
}

export interface UserTransactionStatusResponse {
  id: number;
  transactionId: number;
  userId: number;
  status: UserTranStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserTranStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  USER_PAYMENT_PENDING = "USER_PAYMENT_PENDING",
  WAITING_CHECK_EVIDENCE = "WAITING_CHECK_EVIDENCE",
  PAYMENT_SUCCESS = "PAYMENT_SUCCESS",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  RECEIVED_ADDRESS = "RECEIVED_ADDRESS",
  SENDING_BOOK = "SENDING_BOOK",
  SEND_BOOK_COMPLETED = "SEND_BOOK_COMPLETED",
  WAITING_RECEIVED_BOOK = "WAITING_RECEIVED_BOOK",
  RECEIVED_BOOK = "RECEIVED_BOOK",
}
