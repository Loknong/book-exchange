```mermaid
sequenceDiagram
    participant User
    participant OffersTable as Offers Table
    participant TransactionsTable as Transactions Table
    participant PaymentsTable as Payments Table
    participant Admin
    participant AdminManagementTable as Admin Management Table

    User->>OffersTable: Insert into offers (status: PENDING) /api/transactions (POST)
    
    User->>OffersTable: Update offers (status: ACCEPTED or REJECTED) /api/transactions/:transactionId (PUT)
    
    User->>TransactionsTable: Insert into transactions (status: PENDING) /api/transactions (POST)
    
    User->>TransactionsTable: Update transactions (status: CONFIRMED) /api/transactions/:transactionId/confirm (PUT)
    
    User->>PaymentsTable: Insert into payments (status: PENDING) /api/payments (POST)
    PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_PENDING) /api/transactions/:transactionId (PUT)
    
    User->>PaymentsTable: Update payments (status: PENDING, evidence: User uploads evidence) /api/payments/:paymentId/evidence (PUT)
    PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_IN_PROGRESS) /api/transactions/:transactionId (PUT)
    
    Admin->>PaymentsTable: Update payments (status: COMPLETED or FAILED) /api/admin/payments/:paymentId/verify (PUT)
    Admin->>TransactionsTable: Update transactions (status: PAYMENT_COMPLETED or PAYMENT_FAILED) /api/transactions/:transactionId (PUT)
    
    Admin->>TransactionsTable: Update transactions (status: ADDRESS_SENT) /api/admin/transactions/:transactionId/address (PUT)
    
    User->>TransactionsTable: Update transactions (status: SHIPPING) /api/transactions/:transactionId (PUT)
    
    Admin->>AdminManagementTable: Update adminManagement (status: RECEIVED_BOOKS) /api/admin/transactions/:transactionId/received (PUT)
    
    Admin->>AdminManagementTable: Update adminManagement (status: SHIPPED_TO_USERS) /api/admin/transactions/:transactionId/ship (PUT)
    
    User->>TransactionsTable: Update transactions (status: BOOKS_RECEIVED) /api/transactions/:transactionId/confirm-receipt (PUT)
    
    User->>TransactionsTable: Update transactions (status: COMPLETED) /api/transactions/:transactionId/complete (PUT)
