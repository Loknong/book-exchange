## Services List for Main Process

### Offer Service

- **insertOffer**: Inserts a new offer into the offers table.
  - Arguments: `bookId: number`, `offeredBy: number`, `offeredTo: number`, `offerDetails: string`
- **updateStatus**: Updates the status of an existing offer.
  - Arguments: `offerId: number`, `status: string`
- **getOfferById**: Retrieves an offer by its ID.
  - Arguments: `offerId: number`

### Transaction Service

- **createTransaction**: Inserts a new transaction into the transactions table.
  - Arguments: `offerId: number`, `status: string`
- **updateStatus**: Updates the status of an existing transaction.
  - Arguments: `transactionId: number`, `status: string`
- **getTransactionById**: Retrieves a transaction by its ID.
  - Arguments: `transactionId: number`

### User Transaction Status Service

- **insertUserTransactionStatus**: Inserts a new user transaction status into the userTransactionStatus table.
  - Arguments: `transactionId: number`, `userId: number`, `status: string`
- **updateStatus**: Updates the status of an existing user transaction status.
  - Arguments: `userTransactionStatusId: number`, `status: string`
- **getUserTransactionStatusById**: Retrieves a user transaction status by its ID.
  - Arguments: `userTransactionStatusId: number`
- **getUserTransactionStatusByTransaction**: Retrieves user transaction statuses by transaction ID.
  - Arguments: `transactionId: number`

### Payment Service

- **insertPayment**: Inserts a new payment into the payments table.
  - Arguments: `transactionId: number`, `status: string`
- **updateStatus**: Updates the status of an existing payment.
  - Arguments: `paymentId: number`, `status: string`
- **getPaymentById**: Retrieves a payment by its ID.
  - Arguments: `paymentId: number`
- **getPaymentsByTransaction**: Retrieves payments by transaction ID.
  - Arguments: `transactionId: number`
- **getTransactionId**: Retrieves the transaction ID associated with a payment.
  - Arguments: `paymentId: number`

### Admin Management Service

- **insertAdminManagement**: Inserts a new record into the adminManagement table.
  - Arguments: `transactionId: number`, `status: string`
- **updateStatus**: Updates the status of an existing admin management record.
  - Arguments: `adminManagementId: number`, `status: string`
- **getAdminManagementById**: Retrieves an admin management record by its ID.
  - Arguments: `adminManagementId: number`
- **getAdminManagementByTransaction**: Retrieves admin management records by transaction ID.
  - Arguments: `transactionId: number`

### Status History Service

- **insertStatusHistory**: Inserts a new status history record into the statusHistory table.
  - Arguments: `referenceTable: string`, `referenceId: number`, `status: string`
- **getStatusHistoryByReference**: Retrieves status history records by reference table and reference ID.
  - Arguments: `referenceTable: string`, `referenceId: number`

### Notification Service

- **notifyUsers**: Sends notifications to users.
  - Arguments: `userIds: number[]`, `message: string`

### Logging Service

- **logAction**: Logs an action.
  - Arguments: `action: string`, `details: string`
