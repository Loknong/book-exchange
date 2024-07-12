```mermaid
sequenceDiagram
    participant User
    participant OffersTable as Offers Table
    participant TransactionsTable as Transactions Table
    participant PaymentsTable as Payments Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant AdminManagementTable as Admin Management Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System
    participant Admin

    User->>OffersTable: Insert into offers (status: PENDING)
    OffersTable->>NotificationSystem: Notify book owner
    OffersTable->>LoggingSystem: Log offer creation

    alt Owner Rejects
        Owner->>OffersTable: Update offers (status: REJECTED)
        OffersTable->>NotificationSystem: Notify interested user
        OffersTable->>LoggingSystem: Log rejection
    else Owner Accepts
        Owner->>OffersTable: Update offers (status: ACCEPTED)
        OffersTable->>TransactionsTable: Insert into transactions (status: PENDING)
        TransactionsTable->>NotificationSystem: Notify both users about transaction creation
        TransactionsTable->>LoggingSystem: Log transaction creation

        User->>UserTransactionStatusTable: Insert into UTT (status: PENDING) for both users

        alt Any User Cancels
            User->>UserTransactionStatusTable: Update UTT (status: CANCELED)
            UserTransactionStatusTable->>TransactionsTable: Update transactions (status: CANCELED)
            TransactionsTable->>NotificationSystem: Notify both users
            TransactionsTable->>LoggingSystem: Log cancellation
        else Both Users Confirm
            User->>UserTransactionStatusTable: Update UTT (status: CONFIRMED) for both users
            UserTransactionStatusTable->>TransactionsTable: Update transactions (status: CONFIRMED)
            TransactionsTable->>NotificationSystem: Notify both users
            TransactionsTable->>LoggingSystem: Log confirmation

            User->>PaymentsTable: Insert into payments (status: PENDING)
            PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_PENDING)
            PaymentsTable->>NotificationSystem: Notify both users with payment details
            PaymentsTable->>LoggingSystem: Log payment creation

            User->>UserTransactionStatusTable: Update UTT (status: USER_PAYMENT_PENDING)

            User->>PaymentsTable: Update payments (status: PENDING, evidence: submitted)
            PaymentsTable->>AdminManagementTable: Insert into admin management (status: CHECKING_PAYMENT_EVIDENCE)
            PaymentsTable->>UserTransactionStatusTable: Update UTT (status: WAITING_CHECK_EVIDENCE)
            PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_IN_PROGRESS)
            PaymentsTable->>NotificationSystem: Notify admin
            PaymentsTable->>LoggingSystem: Log payment submission

            Admin->>AdminManagementTable: Update admin management (status: CHECKED_PAYMENT_COMPLETED)

            alt Payment Fails
                Admin->>PaymentsTable: Update payments (status: FAILED)
                PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_FAILED)
                PaymentsTable->>UserTransactionStatusTable: Update UTT (status: PAYMENT_FAILED)
                PaymentsTable->>NotificationSystem: Notify both users
                PaymentsTable->>LoggingSystem: Log payment failure
            else Payment Succeeds
                Admin->>PaymentsTable: Update payments (status: COMPLETED)
                PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_COMPLETED)
                PaymentsTable->>UserTransactionStatusTable: Update UTT (status: PAYMENT_SUCCESS)
                PaymentsTable->>NotificationSystem: Notify both users
                PaymentsTable->>LoggingSystem: Log payment success

                Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_TO_ADMIN)
                TransactionsTable->>AdminManagementTable: Update admin management (status: SENDING_ADDRESS)
                TransactionsTable->>UserTransactionStatusTable: Update UTT (status: RECEIVED_ADDRESS)
                TransactionsTable->>NotificationSystem: Notify both users with admin's address
                TransactionsTable->>LoggingSystem: Log address sent

                User->>UserTransactionStatusTable: Update UTT (status: SENDING_BOOK)
                User->>AdminManagementTable: Update admin management (status: WAITING_BOOK)
                User->>NotificationSystem: Notify admin
                User->>LoggingSystem: Log book shipment

                Admin->>AdminManagementTable: Update admin management (status: RECEIVED_BOOK)
                Admin->>UserTransactionStatusTable: Update UTT (status: SEND_BOOK_COMPLETED)
                Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_COMPLETED) after both books received
                Admin->>NotificationSystem: Notify users about book receipt
                Admin->>LoggingSystem: Log book receipt

                Admin->>AdminManagementTable: Update admin management (status: SENDING_BOOK_TO_USER)
                Admin->>UserTransactionStatusTable: Update UTT (status: WAITING_RECEIVED_BOOK)
                Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_TO_USER)
                Admin->>NotificationSystem: Notify users about book shipment
                Admin->>LoggingSystem: Log book shipment

                User->>UserTransactionStatusTable: Update UTT (status: RECEIVED_BOOK)
                User->>AdminManagementTable: Update admin management (status: COMPLETED)

                alt Both Users Confirm Receipt
                    User->>TransactionsTable: Update transactions (status: COMPLETED)
                    TransactionsTable->>NotificationSystem: Notify completion
                    TransactionsTable->>LoggingSystem: Log transaction completion
                end
            end
        end
    end

```

Understood. We'll combine the user actions with the automatic transitions into a single flow. Each diagram will reflect both the user-triggered actions and the subsequent automatic transitions that occur as a result. This will show the full lifecycle of each status update, including both manual and automatic parts.

### 1. handleCanceledCase

#### When User Cancels

```mermaid
sequenceDiagram
    participant User
    participant HandleUserTransaction as Handle User Transaction
    participant TransactionsTable as Transactions Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>HandleUserTransaction: Initiate handleCanceledCase
    HandleUserTransaction->>TransactionsTable: Update transaction status to CANCELED
    HandleUserTransaction->>NotificationSystem: Notify both users
    HandleUserTransaction->>LoggingSystem: Log transaction cancellation
```

### 2. handleConfirmedCase

#### When User Confirms

```mermaid
sequenceDiagram
    participant User
    participant HandleUserTransaction as Handle User Transaction
    participant UserTransactionStatusTable as User Transaction Status Table
    participant TransactionsTable as Transactions Table
    participant PaymentsTable as Payments Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>HandleUserTransaction: Initiate handleConfirmedCase
    HandleUserTransaction->>UserTransactionStatusTable: Check confirmation status for both users
    alt Both users confirmed
        HandleUserTransaction->>TransactionsTable: Update transaction status to CONFIRMED
        HandleUserTransaction->>PaymentsTable: Create payment details (status: PENDING)
        HandleUserTransaction->>UserTransactionStatusTable: Update status to USER_PAYMENT_PENDING
        HandleUserTransaction->>NotificationSystem: Notify both users about payment details
        HandleUserTransaction->>LoggingSystem: Log confirmation and payment creation

        note over HandleUserTransaction, PaymentsTable: Automatic transition
        PaymentsTable->>TransactionsTable: Update status to PAYMENT_IN_PROGRESS
    else One user confirmed
        HandleUserTransaction->>NotificationSystem: Notify user to wait for other user's confirmation
        HandleUserTransaction->>LoggingSystem: Log single user confirmation
    end
```

### 3. handleWaitingCheckEvidenceCase

#### When User Submits Payment Evidence

```mermaid
sequenceDiagram
    participant User
    participant HandleUserTransaction as Handle User Transaction
    participant PaymentsTable as Payments Table
    participant AdminManagementTable as Admin Management Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>HandleUserTransaction: Submit payment evidence
    HandleUserTransaction->>PaymentsTable: Update payment status to WAITING_CHECK_EVIDENCE
    HandleUserTransaction->>AdminManagementTable: Notify admin to check payment evidence
    HandleUserTransaction->>NotificationSystem: Notify admin and user
    HandleUserTransaction->>LoggingSystem: Log payment evidence submission
```

### 4. handlePaymentSuccessCase

#### When Payment is Successful

```mermaid
sequenceDiagram
    participant Admin
    participant HandleUserTransaction as Handle User Transaction
    participant PaymentsTable as Payments Table
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    Admin->>HandleUserTransaction: Verify payment success
    HandleUserTransaction->>PaymentsTable: Update payment status to PAYMENT_SUCCESS
    HandleUserTransaction->>TransactionsTable: Update transaction status to PAYMENT_COMPLETED
    HandleUserTransaction->>UserTransactionStatusTable: Update user transaction status to PAYMENT_SUCCESS
    HandleUserTransaction->>NotificationSystem: Notify both users of payment success
    HandleUserTransaction->>LoggingSystem: Log payment success

    note over HandleUserTransaction, TransactionsTable: Automatic transition
    TransactionsTable->>UserTransactionStatusTable: Update status to RECEIVED_ADDRESS
    TransactionsTable->>NotificationSystem: Notify users about address receipt
    TransactionsTable->>LoggingSystem: Log address receipt
```

### 5. handlePaymentFailedCase

#### When Payment Fails

```mermaid
sequenceDiagram
    participant Admin
    participant HandleUserTransaction as Handle User Transaction
    participant PaymentsTable as Payments Table
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    Admin->>HandleUserTransaction: Verify payment failure
    HandleUserTransaction->>PaymentsTable: Update payment status to PAYMENT_FAILED
    HandleUserTransaction->>TransactionsTable: Update transaction status to PAYMENT_FAILED
    HandleUserTransaction->>UserTransactionStatusTable: Update user transaction status to PAYMENT_FAILED
    HandleUserTransaction->>NotificationSystem: Notify both users of payment failure
    HandleUserTransaction->>LoggingSystem: Log payment failure
```

### 6. handleReceivedAddressCase

#### When Address is Received

```mermaid
sequenceDiagram
    participant User
    participant HandleUserTransaction as Handle User Transaction
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>HandleUserTransaction: Confirm address receipt
    HandleUserTransaction->>UserTransactionStatusTable: Update status to RECEIVED_ADDRESS
    HandleUserTransaction->>TransactionsTable: Update transaction status to ADDRESS_SENT
    HandleUserTransaction->>NotificationSystem: Notify both users of address receipt
    HandleUserTransaction->>LoggingSystem: Log address receipt

    note over HandleUserTransaction, UserTransactionStatusTable: Automatic transition
    UserTransactionStatusTable->>AdminManagementTable: Notify admin to wait for book
    UserTransactionStatusTable->>LoggingSystem: Log book sending
```

### 7. handleSendingBookCase

#### When User Sends the Book

```mermaid
sequenceDiagram
    participant User
    participant HandleUserTransaction as Handle User Transaction
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant AdminManagementTable as Admin Management Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>HandleUserTransaction: Confirm book sent
    HandleUserTransaction->>UserTransactionStatusTable: Update status to SENDING_BOOK
    HandleUserTransaction->>AdminManagementTable: Notify admin to wait for book
    HandleUserTransaction->>NotificationSystem: Notify admin and user
    HandleUserTransaction->>LoggingSystem: Log book sent

    note over HandleUserTransaction, AdminManagementTable: Automatic transition
    AdminManagementTable->>TransactionsTable: Update status to BOOK_RECEIVED
    AdminManagementTable->>NotificationSystem: Notify users about book receipt
    AdminManagementTable->>LoggingSystem: Log book receipt
```

### 8. handleBookReceivedByAdminCase

#### When Admin Receives the Book

```mermaid
sequenceDiagram
    participant Admin
    participant HandleUserTransaction as Handle User Transaction
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    Admin->>HandleUserTransaction: Confirm book receipt
    HandleUserTransaction->>UserTransactionStatusTable: Update status to SEND_BOOK_COMPLETED
    HandleUserTransaction->>TransactionsTable: Update transaction status to BOOK_RECEIVED
    HandleUserTransaction->>NotificationSystem: Notify both users of book receipt
    HandleUserTransaction->>LoggingSystem: Log book receipt

    note over HandleUserTransaction, TransactionsTable: Automatic transition
    TransactionsTable->>AdminManagementTable: Notify admin to send book to user
    TransactionsTable->>LoggingSystem: Log book sending to user
```

### 9. handleWaitingReceivedBookCase

#### When Waiting for Book Receipt

```mermaid
sequenceDiagram
    participant User
    participant HandleUserTransaction as Handle User Transaction
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>HandleUserTransaction: Confirm book receipt
    HandleUserTransaction->>UserTransactionStatusTable: Update status to RECEIVED_BOOK
    HandleUserTransaction->>TransactionsTable: Update transaction status to COMPLETED
    HandleUserTransaction->>NotificationSystem: Notify both users of transaction completion
    HandleUserTransaction->>LoggingSystem: Log transaction completion

    note over HandleUserTransaction, TransactionsTable: Automatic transition
    TransactionsTable->>LoggingSystem: Log final completion
```

### Combined State Flowchart

#### Full Process Including User Actions and Automatic Transitions

```mermaid
graph TD
    User1[Offer Book: PENDING] -->|User Action<br>Accepted| User2[ACCEPTED]
    User1 -->|User Action<br>Rejected| User3[REJECTED]
    User2 -->|Automatic<br>Transaction created| Trans1[PENDING]
    Trans1 -->|User Action<br>Both users confirm| Trans2[CONFIRMED]
    Trans2 -->|Automatic<br>Payment details created| Payment1[PENDING]
    Payment1 -->|User Action<br>Payment evidence submitted| Payment2[PAYMENT_IN_PROGRESS]
    Payment2 -->|Automatic<br>Payment completed| Payment3[PAYMENT_COMPLETED]
    Payment2 -->|Automatic<br>Payment failed| Payment4[PAYMENT_FAILED]
    Payment3 -->|Automatic<br>Address sent| Trans3[ADDRESS_SENT]
    Trans3 -->|User Action<br>User received address| UTT3[RECEIVED_ADDRESS]
    UTT3 -->|User Action<br>User sends book| UTT4[SENDING_BOOK]
    UTT4 -->|Automatic<br>Admin waiting for book| Admin1[WAITING_BOOK

]
    Admin1 -->|Admin Action<br>Admin received book| Admin2[RECEIVED_BOOK]
    Admin2 -->|Automatic<br>User transaction completed| UTT5[SEND_BOOK_COMPLETED]
    Admin2 -->|Automatic<br>Transaction completed| Trans4[SEND_BOOK_COMPLETED]
    Admin2 -->|Admin Action<br>Admin sends book to user| Admin3[SENDING_BOOK_TO_USER]
    Admin3 -->|Automatic<br>User waiting for book| UTT6[WAITING_RECEIVED_BOOK]
    UTT6 -->|User Action<br>User received book| UTT7[RECEIVED_BOOK]
    UTT7 -->|Automatic<br>Transaction completed| Trans5[COMPLETED]
```

These combined diagrams reflect the full lifecycle of each status update, including both user actions and the automatic transitions that follow. This ensures that every aspect of the process is covered, showing how each state leads to the next.
