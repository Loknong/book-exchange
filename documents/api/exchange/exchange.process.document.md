# Exchange Process Documentation

The Exchange process involves managing the book exchange functionalities within the application. Here is a comprehensive step-by-step flow of the entire process:

## Main Flow:

### User Interest:

- **Action:** User clicks the offer button to show interest in a book.
- **Database Update:** Insert into `Offers` table with status `PENDING`.
- **Notifications:** Notify the book owner.
- **Logging:** Log the offer creation.

### Owner Decision:

- **Action:** Book owner accepts or rejects the offer.
- **Database Update:** Update `Offers` table with status `ACCEPTED` or `REJECTED`.
- **Notifications:** Notify the interested user.
- **Logging:** Log the owner’s decision.

### Transaction Creation (if offer accepted):

- **Action:** Create a transaction upon offer acceptance.
- **Database Update:** Insert into `Transactions` table with status `PENDING`.
- **Notifications:** Notify both users about the transaction creation.
- **Logging:** Log the transaction creation.

### User Confirmation:

- **Action:** Both users confirm or cancel the transaction.
- **Database Update:** Insert into `UserTransactionStatus` table with status `PENDING` for both users.
  - **If any user cancels:**
    - **Update:**
      - Update `UserTransactionStatus` table status to `CANCELED`.
      - Update `Transactions` table status to `CANCELED`.
    - **Notifications:** Notify both users.
    - **Logging:** Log the cancellation.
  - **If both users confirm:**
    - **Update:**
      - Update `UserTransactionStatus` table status to `CONFIRMED`.
      - Update `Transactions` table status to `CONFIRMED`.
    - **Notifications:** Notify both users.
    - **Logging:** Log the confirmation.

### Payment Process:

- **Action:** Initiate the payment process.
- **Database Update:**
  - Insert into `Payments` table with status `PENDING`.
  - Update `Transactions` table status to `PAYMENT_PENDING`.
- **Notifications:** Notify both users with payment details.
- **Logging:** Log the payment creation.
- **User Action:** Update `UserTransactionStatus` table with status `USER_PAYMENT_PENDING`.

### Payment Submission:

- **User Action:** Submit payment evidence.
- **Database Update:**
  - Update `Payments` table with status `PENDING`.
  - Insert into `AdminManagement` table with status `CHECKING_PAYMENT_EVIDENCE`.
  - Update `UserTransactionStatus` table with status `WAITING_CHECK_EVIDENCE`.
  - Update `Transactions` table status to `PAYMENT_IN_PROGRESS`.
- **Notifications:** Notify admin.
- **Logging:** Log the payment submission.

### Admin Check Payment:

- **Admin Action:** Check payment evidence.
- **Database Update:** Update `AdminManagement` table status to `CHECKED_PAYMENT_COMPLETED`.
  - **If payment fails:**
    - **Update:**
      - Update `Payments` table status to `FAILED`.
      - Update `Transactions` table status to `PAYMENT_FAILED`.
      - Update `UserTransactionStatus` table status to `PAYMENT_FAILED`.
    - **Notifications:** Notify both users.
    - **Logging:** Log the payment failure.
  - **If payment succeeds:**
    - **Update:**
      - Update `Payments` table status to `COMPLETED`.
      - Update `Transactions` table status to `PAYMENT_COMPLETED`.
      - Update `UserTransactionStatus` table status to `PAYMENT_SUCCESS`.
    - **Notifications:** Notify both users.
    - **Logging:** Log the payment success.

### Address Exchange (Service Action):

- **Admin Action:** Send address to users.
- **Database Update:**
  - Update `Transactions` table status to `ADDRESS_SENT`.
  - Update `AdminManagement` table status to `SENDING_ADDRESS`.
  - Update `UserTransactionStatus` table status to `RECEIVED_ADDRESS`.
- **Notifications:** Notify both users with admin's address.
- **Logging:** Log the address sent.

### Book Shipment:

- **User Action:** Send book to admin.
- **Database Update:**
  - Update `UserTransactionStatus` table status to `SENDING_BOOK`.
  - Update `AdminManagement` table status to `WAITING_BOOK`.
- **Notifications:** Notify admin.
- **Logging:** Log the book shipment.

### Admin Receives Book:

- **Admin Action:** Receive the book.
- **Database Update:**
  - Update `AdminManagement` table status to `RECEIVED_BOOK`.
  - Update `UserTransactionStatus` table status to `SEND_BOOK_COMPLETED`.
  - Update `Transactions` table status to `SEND_BOOK_COMPLETED` after both books are received.
- **Notifications:** Notify users about book receipt.
- **Logging:** Log the book receipt.

### Admin Sends Book to User:

- **Admin Action:** Send the book to the user.
- **Database Update:**
  - Update `AdminManagement` table status to `SENDING_BOOK_TO_USER`.
  - Update `UserTransactionStatus` table status to `WAITING_RECEIVED_BOOK`.
  - Update `Transactions` table status to `SEND_BOOK_TO_USER`.
- **Notifications:** Notify users about book shipment.
- **Logging:** Log the book shipment.

### User Receives Book:

- **User Action:** Receive the book.
- **Database Update:**
  - Update `UserTransactionStatus` table status to `RECEIVED_BOOK`.
  - Update `AdminManagement` table status to `COMPLETED`.
  - Update `Transactions` table status to `COMPLETED` after both users confirm receipt.
- **Notifications:** Notify completion.
- **Logging:** Log the transaction completion.
