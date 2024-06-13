## Services List for main process

### Offer Service

- insertOffer: Inserts a new offer into the offers table.
- updateStatus: Updates the status of an existing offer.
- getOfferById: Retrieves an offer by its ID.

### Transaction Service

- createTransaction: Inserts a new transaction into the transactions table.
- pdateStatus: Updates the status of an existing transaction.
- getTransactionById: Retrieves a transaction by its ID.

### User Transaction Status Service

- insertUserTransactionStatus: Inserts a new user transaction status into the userTransactionStatus table.
- updateStatus: Updates the status of an existing user transaction status.
- getUserTransactionStatusById: Retrieves a user transaction status by its ID.
- getUserTransactionStatusByTransaction: Retrieves user transaction statuses by transaction ID.

### Payment Service

- insertPayment: Inserts a new payment into the payments table.
- updateStatus: Updates the status of an existing payment.
- getPaymentById: Retrieves a payment by its ID.
- getPaymentsByTransaction: Retrieves payments by transaction ID.
- getTransactionId: Retrieves the transaction ID associated with a payment.

### Admin Management Service

- insertAdminManagement: Inserts a new record into the adminManagement table.
- updateStatus: Updates the status of an existing admin management record.
- getAdminManagementById: Retrieves an admin management record by its ID.
- getAdminManagementByTransaction: Retrieves admin management records by transaction ID.

### Status History Service

- insertStatusHistory: Inserts a new status history record into the statusHistory table.
- getStatusHistoryByReference: Retrieves status history records by reference table and reference ID.

### Notification Service

- notifyUsers: Sends notifications to users (this service is more about sending notifications rather than database operations).

### Logging Service

- logAction: Logs an action (this service is more about logging actions rather than database operations).
