### Exchange Process Flow with API Endpoints and Data

#### Step-by-step Process:

1. **User Initiates Offer:**

   - **Endpoint:** `POST /exchange/offers`
   - **Table:** `Offers`
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
             "details": "Offering my book for exchange",
             "status": "PENDING",
             "createdAt": "2023-01-01T00:00:00.000Z"
         }
     }
     ```
   - **Notifications:** Notify book owner.
   - **Logging:** Log offer creation.

2. **Book Owner Responds to Offer:**

   - **Endpoint:** `PUT /exchange/offers/:offerId`
   - **Table:** `Offers`
   - **Body:**
     ```
     {
         "status": "ACCEPTED" // or "REJECTED"
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
   - **Notifications:** Notify interested user.
   - **Logging:** Log owner decision.

3. **Transaction Creation Upon Offer Acceptance:**

   - **Endpoint:** `POST /exchange/transactions`
   - **Table:** `Transactions`
   - **Body:**
     ```
     {
        "offerId": 123,
        "status": "PENDING"
     }
     ```
   - **Response:**
     ```
     {
        "message": "Transaction initiated successfully",
        "data": {
            "transactionId": 789,
            "offerId": 123,
            "status": "PENDING",
            "createdAt": "2023-01-01T00:00:00.000Z"
        }
     }
     ```
   - **Notifications:** Notify interested user.
   - **Logging:** Log owner decision.

4. **Users Confirm or Cancel Transaction:**

   - **Endpoint:** `PUT /exchange/transactions/:transactionId`
   - **Table:** `Transactions`, `UserTransactionStatus`
   - **Body:**
     ```
     {
        "status": "CONFIRMED" // or "CANCELED"
     }
     ```
   - **Response:**
     ```
        {
            "message": "Transaction status updated successfully",
            "data": {
                "transactionId": 789,
                "status": "CONFIRMED",
                "updatedAt": "2023-01-01T00:00:00.000Z"
            }
        }
     ```
   - **Notifications:** Notify both users.
   - **Logging:** Log confirmation or cancellation.

5. **Payment Process Initiation:**

   - **Endpoint:** `POST /exchange/payments`
   - **Table:** `Payments`
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
   - **Notifications:** Notify both users with payment details.
   - **Logging:** Log payment creation.

6. **Users Submit Payment Evidence:**

   - **Endpoint:** `PUT /exchange/payments/:paymentId`
   - **Table:** `Payments`, `UserTransactionStatus`, `AdminManagement`
   - **Body:**
     ```
        {
            "status": "PENDING",
            "evidence": "Image File That Upload to server"
        }
     ```
   - **Response:**
     ```
        {
            "message": "Payment evidence submitted successfully",
            "data": {
                "paymentId": 123,
                "status": "PENDING",
                "updatedAt": "2023-01-01T00:00:00.000Z"
            }
        }
     ```
   - **Notifications:** Notify admin.
   - **Logging:** Log payment submission.

7. **Admin Checks Payment Evidence:**

   - **Endpoint:** `PUT /exchange/admin/checkPayment/:paymentId`
   - **Table:** `Payments`,`Transactions`,`UserTransactionStatus`, `AdminManagement`
   - **Body:**
     ```
        {
            "status": "COMPLETED" // or "FAILED"
        }
     ```
   - **Response:**
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
   - **Notifications:** Notify both users.
   - **Logging:** Log payment success or failure.

8. **Admin Sends Address to Users (Server Action)**

   - Table: `Transacitons`, `AdminManagement`, `UserTransactionStatus`
   - Update:
     - Tranascion: status to ADDRESS_SENT
     - AdminManagement: status to SENDING_ADDRESS
     - UserTransactionStatus: status to RECEIVED_ADDRESS
   - Notifications: Notify both users with admin's address
   - Logging: Log address sent.

9. **Users Send Books to Admin:**

   - **Endpoint:** `PUT /exchange/admin/receiveBook/:transactionId`
   - **Tables:** `AdminManagement`, `UserTransactionStatus`
   - **Body:**
     ```
        {
            "status": "RECEIVED_BOOK"
        }
     ```
   - **Response:**
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
   - **Notifications:** Notify admin.
   - **Logging:** Log book receipt.

10. **Admin Sends Books to Users:**

    - **Endpoint:** `PUT /exchange/admin/sendBook/:transactionId`
    - **Tables:** `Transactions`, `AdminManagement`, `UserTransactionStatus`
    - **Body:**

    ```
        {
            "status": "SENDING_BOOK_TO_USER"
        }
    ```

    - **Response:**

    ```
        {
            "message": "Book sent to user successfully",
            "data": {
                "transactionId": 789,
                "status": "SENDING_BOOK_TO_USER",
                "updatedAt": "2023-01-01T00:00:00.000Z"
            }
        }
    ```

    - **Notifications:** Notify user about book shipment.
    - **Logging:** Log book shipment.

11. **Users Confirm Book Receipt:**

    - **Endpoint:** `PUT /exchange/user-transaction-status/:id`
    - **Tables:** `UserTransactionStatus`, `AdminManagement`
    - **Body:**

    ```
        {
            "status": "RECEIVED_BOOK"
        }
    ```

    - **Response:**

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

12. **Transaction Completion:**

    - **Tables:** `Transactions`, `UserTransactionStatus`, `AdminManagement`
    - **Updates:**
      - Transactions: status to COMPLETED
      - UserTransactionStatuus: status to COMPLETED
      - AdminManagement: status to COMPLTED
    - **Notificationss:** Notify completion.
    - **Logging:** Log transaction completion.
