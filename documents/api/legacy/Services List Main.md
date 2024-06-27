## Services List for Main Process

### Offer Service

- **insertOffer**: Inserts a new offer into the offers table.
  - Arguments: `connection: PoolConnection`, `bookId: number`, `offeredBy: number`, `offeredTo: number`, `offerDetails: string`
- **updateStatus**: Updates the status of an existing offer.
  - Arguments: `connection: PoolConnection`, `offerId: number`, `status: string`
- **getOfferById**: Retrieves an offer by its ID.
  - Arguments: `connection: PoolConnection`, `offerId: number`

### Transaction Service

- **createTransaction**: Inserts a new transaction into the transactions table.
  - Arguments: `connection: PoolConnection`, `offerId: number`, `status: string`
- **updateStatus**: Updates the status of an existing transaction.
  - Arguments: `connection: PoolConnection`, `transactionId: number`, `status: string`
- **getTransactionById**: Retrieves a transaction by its ID.
  - Arguments: `connection: PoolConnection`, `transactionId: number`

### User Transaction Status Service

- **insertUserTransactionStatus**: Inserts a new user transaction status into the userTransactionStatus table.
  - Arguments: `connection: PoolConnection`, `transactionId: number`, `userId: number`, `status: string`
- **updateStatus**: Updates the status of an existing user transaction status.
  - Arguments: `connection: PoolConnection`, `id: number`, `status: string`
- **getUserTransactionStatusById**: Retrieves a user transaction status by its ID.
  - Arguments: `connection: PoolConnection`, `id: number`
- **getUserTransactionStatusByTransaction**: Retrieves user transaction statuses by transaction ID.
  - Arguments: `connection: PoolConnection`, `transactionId: number`

### Payment Service

- **insertPayment**: Inserts a new payment into the payments table.
  - Arguments: `connection: PoolConnection`, `transactionId: number`, `status: string`
- **updateStatus**: Updates the status of an existing payment.
  - Arguments: `connection: PoolConnection`, `paymentId: number`, `status: string`
- **getPaymentById**: Retrieves a payment by its ID.
  - Arguments: `connection: PoolConnection`, `paymentId: number`
- **getPaymentsByTransaction**: Retrieves payments by transaction ID.
  - Arguments: `connection: PoolConnection`, `transactionId: number`
- **getTransactionId**: Retrieves the transaction ID associated with a payment.
  - Arguments: `connection: PoolConnection`, `paymentId: number`

### Admin Management Service

- **insertAdminManagement**: Inserts a new record into the adminManagement table.
  - Arguments: `connection: PoolConnection`, `transactionId: number`, `status: string`
- **updateStatus**: Updates the status of an existing admin management record.
  - Arguments: `connection: PoolConnection`, `managementId: number`, `status: string`
- **getAdminManagementById**: Retrieves an admin management record by its ID.
  - Arguments: `connection: PoolConnection`, `managementId: number`
- **getAdminManagementByTransaction**: Retrieves admin management records by transaction ID.
  - Arguments: `connection: PoolConnection`, `transactionId: number`

### Status History Service

- **insertStatusHistory**: Inserts a new status history record into the statusHistory table.
  - Arguments: `connection: PoolConnection`, `referenceTable: string`, `referenceId: number`, `status: string`
- **getStatusHistoryByReference**: Retrieves status history records by reference table and reference ID.
  - Arguments: `connection: PoolConnection`, `referenceTable: string`, `referenceId: number`

### Notification Service

- **notifyUsers**: Sends notifications to users.
  - Arguments: `connection: PoolConnection`, `userIds: number[]`, `message: string`

### Logging Service

- **logAction**: Logs an action.
  - Arguments: `connection: PoolConnection`, `action: string`, `details: string`
