// utils/statusChecker.ts
export const shouldGoNext = (table: string, updateStatus: string): boolean => {
  switch (table) {
    case "Offers":
      switch (updateStatus) {
        case "ACCEPTED":
          return true;
        case "REJECTED":
          return false;
        default:
          return false;
      }

    case "Admin":
      switch (updateStatus) {
        case "CHECKED_PAYMENT_COMPLETED":
          return true;
        default:
          return false;
      }

    case "UserTransactionStatus":
      switch (updateStatus) {
        case "CONFIRMED":
          return true;
        case "CANCELED":
          return false;
        case "USER_PAYMENT_PENDING":
          return true;
        case "WAITING_CHECK_EVIDENCE":
          return true;
        case "PAYMENT_SUCCESS":
          return true;
        case "PAYMENT_FAILED":
          return false;
        case "RECEIVED_ADDRESS":
          return true;
        case "SENDING_BOOK":
          return true;
        case "SEND_BOOK_COMPLETED":
          return true;
        case "WAITING_RECEIVED_BOOK":
          return true;
        case "RECEIVED_BOOK":
          return true;
        default:
          return false;
      }

    case "TransactionStatus":
      switch (updateStatus) {
        case "CONFIRMED":
          return true;
        case "CANCELED":
          return false;
        case "PAYMENT_PENDING":
          return true;
        case "PAYMENT_IN_PROGRESS":
          return true;
        case "PAYMENT_COMPLETED":
          return true;
        case "PAYMENT_FAILED":
          return false;
        case "ADDRESS_SENT":
          return true;
        case "BOOK_RECEIVED":
          return true;
        case "BOOK_PROCESSING":
          return true;
        case "COMPLETED":
          return true;
        default:
          return false;
      }

    default:
      return false;
  }
};
