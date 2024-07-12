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

Got it! I'll focus on separating the user actions and automatic transitions in the entire process. Here's the detailed sequence of each part of the process, clearly indicating user actions and automatic transitions:

### Offer Creation Process

#### User Action: Creating an Offer

```mermaid
sequenceDiagram
    participant User
    participant OffersTable as Offers Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>OffersTable: Insert into offers (status: PENDING)
    OffersTable->>NotificationSystem: Notify book owner
    OffersTable->>LoggingSystem: Log offer creation
```

### Offer Response Process

#### User Action: Responding to an Offer

```mermaid
sequenceDiagram
    participant Owner
    participant OffersTable as Offers Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System
    participant TransactionsTable as Transactions Table

    alt Owner Rejects
        Owner->>OffersTable: Update offers (status: REJECTED)
        OffersTable->>NotificationSystem: Notify interested user
        OffersTable->>LoggingSystem: Log rejection
    else Owner Accepts
        Owner->>OffersTable: Update offers (status: ACCEPTED)
        OffersTable->>LoggingSystem: Log acceptance

        note over OffersTable: Automatic transition
        OffersTable->>TransactionsTable: Insert into transactions (status: PENDING)
        TransactionsTable->>NotificationSystem: Notify both users about transaction creation
        TransactionsTable->>LoggingSystem: Log transaction creation

        note over TransactionsTable: Automatic transition
        TransactionsTable->>UserTransactionStatusTable: Insert into UTT (status: PENDING) for both users
    end
```

### User Transaction Status Creation Process

#### Automatic Transition: Creating User Transaction Status

```mermaid
sequenceDiagram
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table

    TransactionsTable->>UserTransactionStatusTable: Insert into UTT (status: PENDING) for both users
```

### User Cancellation Process

#### User Action: Canceling a Transaction

```mermaid
sequenceDiagram
    participant User
    participant UserTransactionStatusTable as User Transaction Status Table
    participant TransactionsTable as Transactions Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>UserTransactionStatusTable: Update UTT (status: CANCELED)
    UserTransactionStatusTable->>TransactionsTable: Update transactions (status: CANCELED)
    TransactionsTable->>NotificationSystem: Notify both users
    TransactionsTable->>LoggingSystem: Log cancellation
```

### User Confirmation Process

#### User Action: Confirming a Transaction

```mermaid
sequenceDiagram
    participant User
    participant UserTransactionStatusTable as User Transaction Status Table
    participant TransactionsTable as Transactions Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    User->>UserTransactionStatusTable: Update UTT (status: CONFIRMED) for both users
    UserTransactionStatusTable->>TransactionsTable: Update transactions (status: CONFIRMED)
    TransactionsTable->>NotificationSystem: Notify both users
    TransactionsTable->>LoggingSystem: Log confirmation
```

### Payment Initiation Process

#### User Action: Submitting Payment Evidence

```mermaid
sequenceDiagram
    participant User
    participant PaymentsTable as Payments Table
    participant TransactionsTable as Transactions Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System
    participant UserTransactionStatusTable as User Transaction Status Table
    participant AdminManagementTable as Admin Management Table

    note over TransactionsTable: Automatic transition
    TransactionsTable->>PaymentsTable: Insert into payments (status: PAYMENT_PENDING)
    PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_PENDING)
    PaymentsTable->>NotificationSystem: Notify both users with payment details
    PaymentsTable->>LoggingSystem: Log payment creation

    User->>PaymentsTable: Update payments (status: PENDING, evidence: submitted)
    PaymentsTable->>AdminManagementTable: Insert into admin management (status: CHECKING_PAYMENT_EVIDENCE)
    PaymentsTable->>UserTransactionStatusTable: Update UTT (status: WAITING_CHECK_EVIDENCE)
    PaymentsTable->>TransactionsTable: Update transactions (status: PAYMENT_IN_PROGRESS)
    PaymentsTable->>NotificationSystem: Notify admin
    PaymentsTable->>LoggingSystem: Log payment submission
```

### Admin Payment Verification Process

#### Automatic Transition: Admin Verification of Payment

```mermaid
sequenceDiagram
    participant Admin
    participant AdminManagementTable as Admin Management Table
    participant PaymentsTable as Payments Table
    participant TransactionsTable as Transactions Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

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
    end
```

### Address Exchange Process

#### Automatic Transition: Sending Address

```mermaid
sequenceDiagram
    participant Admin
    participant TransactionsTable as Transactions Table
    participant AdminManagementTable as Admin Management Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System

    note over PaymentsTable: Automatic transition
    PaymentsTable->>TransactionsTable: Update transactions (status: ADDRESS_SENT)
    TransactionsTable->>AdminManagementTable: Update admin management (status: SENDING_ADDRESS)
    TransactionsTable->>UserTransactionStatusTable: Update UTT (status: RECEIVED_ADDRESS)
    TransactionsTable->>NotificationSystem: Notify both users with admin's address
    TransactionsTable->>LoggingSystem: Log address sent
```

### Book Shipping Process

#### User Action: Sending the Book

```mermaid
sequenceDiagram
    participant User
    participant UserTransactionStatusTable as User Transaction Status Table
    participant AdminManagementTable as Admin Management Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System
    participant Admin

    User->>UserTransactionStatusTable: Update UTT (status: SENDING_BOOK)
    User->>AdminManagementTable: Update admin management (status: WAITING_BOOK)
    User->>NotificationSystem: Notify admin
    User->>LoggingSystem: Log book shipment

    note over AdminManagementTable: Automatic transition
    AdminManagementTable->>Admin: Admin receives book
    Admin->>AdminManagementTable: Update admin management (status: RECEIVED_BOOK)
    Admin->>UserTransactionStatusTable: Update UTT (status: SEND_BOOK_COMPLETED)
    Admin->>NotificationSystem: Notify users about book receipt
    Admin->>LoggingSystem: Log book receipt
```

### Final Book Shipping to Users Process

#### Admin Action: Sending the Book to User

```mermaid
sequenceDiagram
    participant Admin
    participant AdminManagementTable as Admin Management Table
    participant UserTransactionStatusTable as User Transaction Status Table
    participant TransactionsTable as Transactions Table
    participant NotificationSystem as Notification System
    participant LoggingSystem as Logging System
    participant User

    Admin->>AdminManagementTable: Update admin management (status: SENDING_BOOK_TO_USER)
    Admin->>UserTransactionStatusTable: Update UTT (status: WAITING_RECEIVED_BOOK)
    Admin->>TransactionsTable: Update transactions (status: SEND_BOOK_TO_USER)
    Admin->>NotificationSystem: Notify users about book shipment
    Admin->>LoggingSystem: Log book shipment

    note over UserTransactionStatusTable: Automatic transition
    UserTransactionStatusTable->>User: User receives book
    User->>UserTransactionStatusTable: Update UTT (status: RECEIVED_BOOK)
    User->>AdminManagementTable: Update admin management (status: COMPLETED)

    alt Both Users Confirm Receipt
        User->>TransactionsTable: Update transactions (status: COMPLETED)
        TransactionsTable->>NotificationSystem: Notify completion
        TransactionsTable->>LoggingSystem: Log transaction completion
    end
```

### Combined State Flowchart

#### Overall Process with User Actions and Automatic Transitions

```mermaid
graph TD
    User1[Offer Book: PENDING] -->|User Action<br>Accepted| User2[ACCEPTED]
    User1 -->|User Action<br>Rejected| User3[REJECTED]
    User2 -->|Automatic<br>Transaction created| Trans1[PENDING]
    Trans1 -->|User Action<br>Both users confirm| Trans2[CONFIRMED]
    Trans2 -->|Automatic<br>Payment details created| Payment1[PENDING]
    Payment1 -->|User Action<br>Payment in progress| Payment2[PAYMENT_IN_PROGRESS]
    Payment2 -->|User Action<br>Payment evidence submitted| Payment3[PAYMENT_COMPLETED]
    Payment2 -->|Automatic<br>Payment failed| Payment4[PAYMENT_FAILED]
    Payment3 -->|Automatic<br>Address sent| Trans3[ADDRESS_SENT]
    Trans3 -->|User Action<br>User received

 address| UTT3[RECEIVED_ADDRESS]
    UTT3 -->|User Action<br>User sends book| UTT4[SENDING_BOOK]
    UTT4 -->|Automatic<br>Admin waiting for book| Admin1[WAITING_BOOK]
    Admin1 -->|Admin Action<br>Admin received book| Admin2[RECEIVED_BOOK]
    Admin2 -->|Automatic<br>User transaction completed| UTT5[SEND_BOOK_COMPLETED]
    Admin2 -->|Automatic<br>Transaction completed| Trans4[SEND_BOOK_COMPLETED]
    Admin2 -->|Admin Action<br>Admin sends book to user| Admin3[SENDING_BOOK_TO_USER]
    Admin3 -->|Automatic<br>User waiting for book| UTT6[WAITING_RECEIVED_BOOK]
    UTT6 -->|User Action<br>User received book| UTT7[RECEIVED_BOOK]
    UTT7 -->|Automatic<br>Transaction completed| Trans5[COMPLETED]
```

This detailed sequence breaks down the user actions and automatic transitions, ensuring that you can easily understand which parts are triggered by user actions and which are automatic.
