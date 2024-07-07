const allowedTransitions = {
  UserTransactionStatus: {
    PENDING: ["CONFIRMED", "CANCELED"],
    CONFIRMED: ["USER_PAYMENT_PENDING"],
    USER_PAYMENT_PENDING: ["WAITING_CHECK_EVIDENCE"],
    WAITING_CHECK_EVIDENCE: ["PAYMENT_SUCCESS", "PAYMENT_FAILED"],
    PAYMENT_SUCCESS: ["RECEIVED_ADDRESS"],
    RECEIVED_ADDRESS: ["SENDING_BOOK"],
    SENDING_BOOK: ["SEND_BOOK_COMPLETED"],
    SEND_BOOK_COMPLETED: ["WAITING_RECEIVED_BOOK"],
    WAITING_RECEIVED_BOOK: ["RECEIVED_BOOK"],
  },
  AdminManagement: {
    CHECKING_PAYMENT_EVIDENCE: ["CHECKED_PAYMENT_COMPLETED"],
    CHECKED_PAYMENT_COMPLETED: ["SENDING_ADDRESS"],
    SENDING_ADDRESS: ["WAITING_BOOK"],
    WAITING_BOOK: ["RECEIVED_BOOK"],
    RECEIVED_BOOK: ["SENDING_BOOK_TO_USER"],
    SENDING_BOOK_TO_USER: ["COMPLETED"],
  },
  TransactionStatus: {
    PENDING: ["CONFIRMED", "CANCELED"],
    CONFIRMED: ["PAYMENT_PENDING"],
    PAYMENT_PENDING: ["PAYMENT_IN_PROGRESS"],
    PAYMENT_IN_PROGRESS: ["PAYMENT_COMPLETED", "PAYMENT_FAILED"],
    PAYMENT_COMPLETED: ["ADDRESS_SENT"],
    ADDRESS_SENT: ["BOOK_RECEIVED"],
    BOOK_RECEIVED: ["BOOK_PROCESSING"],
    BOOK_PROCESSING: ["COMPLETED"],
  },
  OfferStatus: {
    PENDING: ["ACCEPTED", "REJECTED"],
  },
} as any;

export const validateStateTransition = (
  entity: string,
  currentState: string,
  newState: string
): boolean => {
  console.log("entity", entity);
  console.log("currentState", currentState);
  console.log("newState", newState);

  return allowedTransitions[entity]?.[currentState]?.includes(newState);
};
