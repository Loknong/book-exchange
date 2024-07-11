### Exchange

Exchange encompasses functionalities related to managing the book exchange process within the application.

#### Admin

**Admin** encompasses functionalities related to administrative actions within the book exchange process.

**Common Elements**:

- **Admin Actions**: Administrative actions related to book exchanges.

**Usage**:

- Managing and overseeing book exchanges from an administrative perspective.
- Handling disputes and managing the overall exchange process.

**Example Use Case**:

- **Check Payment Evidence:** Checking the payment evidence submitted by users.
- **Receive Book:** Admin receiving the book from users.
- **Send Book to User:** Admin sending the book to the end user.

**Features List:**

<!--
1. **Approve Exchange**:

   - Endpoint: `PUT /exchange/admin/approve/:exchangeId`
   - Description: Approves a book exchange request.
   - **Status**: OfferStatus.ACCEPTED
   - **Body**

     ```
     {
        "status": "ACCEPTED"
     }

     ```

   - **Response**

     ```
     {
        "message": "Exchange approved successfully",
        "data": {
           "exchangeId": 123,
           "status": "ACCEPTED"
        }
     }

     ```

2. **Reject Exchange**:

   - Endpoint: `PUT /exchange/admin/reject/:exchangeId`
   - Description: Rejects a book exchange request.
   - **Status**: OfferStatus.REJECTED
   - **Body**

     ```
     {
        "status": "REJECTED"
     }

     ```

   - **Response**

     ```
     {
        "message": "Exchange refected successfully",
        "data": {
           "exchangeId": 123,
           "status": "REJECTED"
        }
     }

     ``` -->

1. **Check Payment Evidence**

   - Endpoint: `PUT /exchange/admin/checkPayment/:paymentId`
   - Description: Admin checks the payment evidence.
   - **Status**: PaymentStatus.COMPLETED
   - **Body**

     ```
     {
        "status": "COMPLTED" // or "FAILED"
     }

     ```

   - **Response**

     ```
     {
        "message": "Payment evidence checked successfully",
        "data": {
           "paymentId": 123,
           "status": "COMPLETED",
           "updatedAt": "2023-01-01T00:00:00.000Z"
        }
     }

     ```

2. **Receive Book**

   - Endpoint: `PUT /exchange/admin/receiveBook/:transactionId`
   - Description: Admin receives the book.
   <!-- - **Status**: PaymentStatus.COMPLETED -->
   - **Body**

     ```
     {
        "status": "RECEIVED_BOOK"
     }

     ```

   - **Response**

     ```
     {
        "message": "Book received successfully",
        "data": {
           "transactionId": 789,
           "status": "RECEIVED_BOOK",
           "updatedAt": "2023-01-01T00:00:00.000Z"
        }
     }

     ```

3. **Send Book to User**

   - Endpoint: `PUT /exchange/admin/sendBook/:transactionId`
   - Description: Admin sends the book to the user.
   <!-- - **Status**: PaymentStatus.COMPLETED -->
   - **Body**

     ```
     {
        "status": "SENDING_BOOK_TO_USER"
     }

     ```

   - **Response**

     ```
     {
        "message": "Book sent to user successfully"",
        "data": {
           "transactionId": 789,
           "status": "SENDING_BOOK_TO_USER",
           "updatedAt": "2023-01-01T00:00:00.000Z"
        }
     }

     ```

4. **Manage Users**:

   - Endpoint: `GET /exchange/admin/users`
   - Description: Manages users involved in the exchange process.
   - **Response:**

     ```
        {
           "message": "Users retrieved successfully",
           "data": [
              {
                 "userId": 1,
                 "firstName": "John",
                 "lastName": "Doe",
                 "email": "john.doe@example.com",
                 "username": "johndoe",
                 "credit": 100,
                 "status": "ACTIVE"
              },
              ...
           ]
        }

     ```

5. Send Address do in Services

#### Notifications

**Notifications** encompasses functionalities related to managing notifications within the book exchange process.

**Common Elements**:

- **Exchange Notifications**: Notifications related to book exchanges.

**Usage**:

- Managing notifications for various events in the book exchange process.
- Keeping users informed about the status of their exchanges.

**Example Use Case**:

- **Notify User**: Sending a notification to a user about an exchange event.
- **Get Notifications**: Retrieving notifications for a user.

**Features List**:

1. **Notify User**:

   - Endpoint: `POST /exchange/notifications`
   - Description: Sends a notification to a user about an exchange event.
   - **Body:**

     ```
      {
         "userId": 1,
         "message": "Your exchange offer was accepted"
      }

     ```

   - **Response:**

     ```
      {
         "message": "Notification sent successfully",
         "data": {
            "notificationId": 123,
            "userId": 1,
            "message": "Your exchange offer was accepted",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

2. **Get Notifications**:

   - Endpoint: `GET /exchange/notifications/:userId`
   - Description: Retrieves notifications for a user.
   - **Response:**

     ```
      {
         "message": "Notifications retrieved successfully",
         "data": [
            {
               "notificationId": 1,
               "userId": 1,
               "message": "Your exchange offer was accepted",
               "createdAt": "2023-01-01T00:00:00.000Z"
            },
            ...
         ]
      }

     ```

#### Offers

**Offers** encompasses functionalities related to managing offers within the book exchange process.

**Common Elements**:

- **Offers Management**: Creating, updating, and managing offers for book exchanges.

**Usage**:

- Handling offers made and received for book exchanges.
- Managing the negotiation process between users.

**Example Use Case**:

- **Create Offer**: Creating a new offer for a book exchange.
- **Update Offer**: Updating an existing offer for a book exchange.
- **Get Offers**: Retrieving offers made and received.

**Features List**:

1. **Create Offer**:

   - Endpoint: `POST /exchange/offers`
   - Description: Creates a new offer for a book exchange.
   - **Status**: OfferStatus.PENDING
   - **Body:**

     ```
      {
         "bookId": 1,
         "offeredById": 1,
         "offeredToId": 2,
         "details": "Offering my book for exchange",
         "status": "PENDING"
      }

     ```

   - **Response:**

     ```
      {
         "message": "Offer created successfully",
         "data": {
            "offerId": 123,
            "bookId": 1,
            "offeredById": 1,
            "offeredToId": 2,
            "details": "Offering my book for exchange.",
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

2. **Update Offer**:

   - Endpoint: `PUT /exchange/offers/:offerId`
   - Description: Updates an existing offer for a book exchange.
   - **Status**: OfferStatus.ACCEPTED, OfferStatus.REJECTED
   - **Body:**

     ```
      {
         "status":"ACCEPTED" // or "REJECTED"
      }

     ```

   - **Response:**

     ```
      {
         "message": "Offer updated successfully",
         "data": {
            "offerId": 123,
            "status": "ACCEPTED",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

3. **Get Offers**:

   - Endpoint: `GET /exchange/offers/:userId`
   - Description: Retrieves offers made and received by a user.
   - **Response:**

     ```
      {
         "message": "Offers retrieved successfully",
         "data": [
            {
               "offerId": 123,
               "bookId": 1,
               "offeredById": 1,
               "offeredToId": 2,
               "details": "Offering my book for exchange.",
               "status": "PENDING",
               "createdAt": "2023-01-01T00:00:00.000Z"
            },
            ...
         ]
      }

     ```

#### Payments

**Payments** encompasses functionalities related to managing payments within the book exchange process.

**Common Elements**:

- **Payment Management**: Handling payments related to book exchanges.

**Usage**:

- Managing payments for book exchanges.
- Ensuring secure and reliable payment transactions.

**Example Use Case**:

- **Initiate Payment**: Initiating a payment for a book exchange.
- **Get Payment Status**: Retrieving the status of a payment.
- **Update Payment Status**: Updating the status of a payment.

**Features List**:

1. **Initiate Payment**:

   - Endpoint: `POST /exchange/payments`
   - Description: Initiates a payment for a book exchange.
   - **Status**: PaymentStatus.PENDING
   - **Body:**

     ```
      {
         "userId": 1,
         "transactionId": 789,
         "amount": 100.00,
         "status": "PENDING"
      }

     ```

   - **Response:**

     ```
      {
         "message": "Payment initiated successfully",
         "data": {
            "paymentId": 123,
            "userId": 1,
            "transactionId": 789,
            "amount": 100.00,
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

2. **Get Payment Status**:

   - Endpoint: `GET /exchange/payments/:paymentId`
   - Description: Retrieves the status of a payment.
   <!-- - **Status**: PaymentStatus.PENDING, PaymentStatus.COMPLETED, PaymentStatus.FAILED -->
   - **Response:**

     ```
      {
         "Payment status retrieved successfully",
         "data": {
            "paymentId": 123,
            "userId": 1,
            "transactionId": 789,
            "amount": 100.00,
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

3. **Update Payment Status**:

   - Endpoint: `PUT /exchange/payments/:paymentId`
   - Description: Updates the status of a payment.
   - **Status**: PaymentStatus.PAYMENT_IN_PROGRESS, PaymentStatus.PAYMENT_COMPLETED, PaymentStatus.PAYMENT_FAILED
   - **Body:**

     ```
      {
         "status": "PAYMENT_IN_PROGRESS" // or "PAYMENT_COMPLETED" or "PAYMENT_FAILED"
      }

     ```

   - **Response:**

     ```
      {
         "message": "Payment status updated successfully",
         "data": {
            "paymentId": 123,
            "status": "PAYMENT_IN_PROGRESS",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

#### Tracking

**Tracking** encompasses functionalities related to tracking the status of book exchanges.

**Common Elements**:

- **Exchange Tracking**: Tracking the status of book exchanges.

**Usage**:

- Providing real-time tracking of the status of book exchanges.
- Keeping users informed about the progress of their exchanges.

**Example Use Case**:

- **Track Exchange**: Tracking the status of a specific book exchange.
- **Get Exchange History**: Retrieving the history of status changes for a book exchange.

**Features List**:

1. **Track Exchange**:

   - Endpoint: `GET /exchange/tracking/:exchangeId`
   - Description: Tracks the status of a specific book exchange.
   <!-- - **Status**: TransactionStatus.PENDING, TransactionStatus.CONFIRMED, TransactionStatus.CANCELED -->
   - **Response:**

     ```
      {
         "message": "Exchange status retrieved successfully",
         "data": {
            "exchangeId": 123,
            "status": "PENDING",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

2. **Get Exchange History**:

   - Endpoint: `GET /exchange/tracking/history/:exchangeId`
   - Description: Retrieves the history of status changes for a book exchange.
   - **Response:**

     ```
      {
         "message": "Exchange history retrieved successfully",
         "data": [
            {
               "exchangeId": 123,
               "status": "PENDING",
               "updatedAt": "2023-01-01T00:00:00.000Z"
            },
            ...
         ]
      }

     ```

#### Transactions

**Transactions** encompasses functionalities related to managing transactions within the book exchange process.

**Common Elements**:

- **Transaction Management**: Handling transactions related to book exchanges.

**Usage**:

- Managing the flow of transactions in book exchanges.
- Ensuring the completion of book exchange transactions.

**Example Use Case**:

- **Initiate Transaction**: Initiating a transaction for a book exchange.
- **Get Transaction Status**: Retrieving the status of a transaction.
- **Update Transaction Status**: Updating the status of a transaction.

**Features List**:

1. **Initiate Transaction**:

   - Endpoint: `POST /exchange/transactions`
   - Description: Initiates a transaction for a book exchange.
   - **Status**: TransactionStatus.PENDING
   - **Body:**

     ```
      {
         "offerId": 1,
         "status": "PENDING"
      }

     ```

   - **Response:**

     ```
      {
         "message": "Transaction initiated successfully",
         "data": {
            "transactionId": 789,
            "offerId": 1,
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

2. **Get Transaction Status**:

   - Endpoint: `GET /exchange/transactions/:transactionId`
   - Description: Retrieves the status of a transaction.
   <!-- - **Status**: TransactionStatus.PENDING, TransactionStatus.CONFIRMED, TransactionStatus.CANCELED, TransactionStatus.COMPLETED -->
   - **Response:**

     ```
      {
         "message": "Transaction status retrieved successfully",
         "data": {
            "transactionId": 789,
            "offerId": 1,
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

3. **Update Transaction Status**:

   - Endpoint: `PUT /exchange/transactions/:transactionId`
   - Description: Updates the status of a transaction.
   - Allowed Transaciton:

     - PENDING: ["CONFIRMED", "CANCELED"]
     - CONFIRMED: ["PAYMENT_PENDING"]
     - PAYMENT_PENDING: ["PAYMENT_IN_PROGRESS"]
     - PAYMENT_IN_PROGRESS: ["PAYMENT_COMPLETED", "PAYMENT_FAILED"]
     - PAYMENT_COMPLETED: ["ADDRESS_SENT"]
     - ADDRESS_SENT: ["BOOK_RECEIVED"]
     - BOOK_RECEIVED: ["BOOK_PROCESSING"]
     - BOOK_PROCESSING: ["COMPLETED"]

   - **Body:**

     ```
      {
         "status": "PAYMENT_PENDING"
      }


     ```

   - **Response:**

     ```
      {
         "message": "Transaction status updated successfully",
         "data": {
            "transactionId": 789,
            "status": "PAYMENT_PENDING",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

#### User Transaction Status API

**Features List**:

1. **Create User Transaction Status**:

   - Endpoint: `POST /exchange/user-transaction-status`
   - Description: Creates a new user transaction status.
   - **Body:**

     ```
      {
         "userId": 1,
         "transactionId": 456,
         "status": "PENDING"
      }

     ```

   - **Response:**

     ```
      {
         "message": "User transaction status created successfully",
         "data": {
            "userId": 1,
            "transactionId": 7456,
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```

2. **Update User Transaction Status**:

   - Endpoint: `PUT /exchange/user-transaction-status/:userId/:transactionId`
   - Description: Updates the user transaction status.
   - **Allowed Update Status**
     - PENDING: ["CONFIRMED", "CANCELED"]
     - CONFIRMED: ["USER_PAYMENT_PENDING"]
     - USER_PAYMENT_PENDING: ["WAITING_CHECK_EVIDENCE"]
     - WAITING_CHECK_EVIDENCE: ["PAYMENT_SUCCESS", "PAYMENT_FAILED"]
     - PAYMENT_SUCCESS: ["RECEIVED_ADDRESS"]
     - RECEIVED_ADDRESS: ["SENDING_BOOK"]
     - SENDING_BOOK: ["SEND_BOOK_COMPLETED"]
     - SEND_BOOK_COMPLETED: ["WAITING_RECEIVED_BOOK"]
     - WAITING_RECEIVED_BOOK: ["RECEIVED_BOOK"]
   - **Body**

     ```
      {
         "status": "CONFIRMED"
      }

     ```

   - **Response:**

     ```
      {
         "message": "User transaction status retrieved successfully",
         "data": {
            "transactionId": 789,
            "offerId": 1,
            "status": "COMFIRMED",
            "createdAt": "2023-01-01T00:00:00.000Z"
         }
      }

     ```
