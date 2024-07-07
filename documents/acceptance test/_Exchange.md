### Comprehensive Acceptance Test Plan for Exchange Process

#### User Interest

**Test Case 1: User Initiates Offer**
- **Preconditions:** User is logged in.
- **Steps:**
  1. User clicks the offer button on a book listing.
  2. System inserts a new entry into the `Offers` table with status `PENDING`.
  3. System sends a notification to the book owner.
  4. System logs the offer creation.
- **Expected Results:**
  - New entry in `Offers` table with status `PENDING`.
  - Notification received by the book owner.
  - Log entry created for offer creation.

#### Owner Decision

**Test Case 2: Book Owner Accepts Offer**
- **Preconditions:** Offer exists with status `PENDING`.
- **Steps:**
  1. Book owner accepts the offer.
  2. System updates the `Offers` table with status `ACCEPTED`.
  3. System creates a new entry in the `Transactions` table with status `PENDING`.
  4. System sends notifications to both users.
  5. System logs the offer acceptance and transaction creation.
- **Expected Results:**
  - `Offers` table entry updated to `ACCEPTED`.
  - New entry in `Transactions` table with status `PENDING`.
  - Notifications sent to both users.
  - Log entries created for offer acceptance and transaction creation.

**Test Case 3: Book Owner Rejects Offer**
- **Preconditions:** Offer exists with status `PENDING`.
- **Steps:**
  1. Book owner rejects the offer.
  2. System updates the `Offers` table with status `REJECTED`.
  3. System sends a notification to the interested user.
  4. System logs the offer rejection.
- **Expected Results:**
  - `Offers` table entry updated to `REJECTED`.
  - Notification sent to the interested user.
  - Log entry created for offer rejection.

#### User Confirmation

**Test Case 4: Both Users Confirm Transaction**
- **Preconditions:** Transaction exists with status `PENDING`.
- **Steps:**
  1. Both users confirm the transaction.
  2. System updates the `UserTransactionStatus` table with status `CONFIRMED` for both users.
  3. System updates the `Transactions` table with status `CONFIRMED`.
  4. System sends notifications to both users.
  5. System logs the confirmations.
- **Expected Results:**
  - `UserTransactionStatus` entries updated to `CONFIRMED`.
  - `Transactions` table entry updated to `CONFIRMED`.
  - Notifications sent to both users.
  - Log entries created for confirmations.

**Test Case 5: Any User Cancels Transaction**
- **Preconditions:** Transaction exists with status `PENDING`.
- **Steps:**
  1. Any user cancels the transaction.
  2. System updates the `UserTransactionStatus` table with status `CANCELED`.
  3. System updates the `Transactions` table with status `CANCELED`.
  4. System sends notifications to both users.
  5. System logs the cancellation.
- **Expected Results:**
  - `UserTransactionStatus` entry updated to `CANCELED`.
  - `Transactions` table entry updated to `CANCELED`.
  - Notifications sent to both users.
  - Log entry created for cancellation.

#### Payment Process

**Test Case 6: Initiate Payment**
- **Preconditions:** Transaction exists with status `CONFIRMED`.
- **Steps:**
  1. User initiates payment.
  2. System inserts a new entry into the `Payments` table with status `PENDING`.
  3. System updates the `Transactions` table with status `PAYMENT_PENDING`.
  4. System sends notifications to both users.
  5. System logs the payment initiation.
- **Expected Results:**
  - New entry in `Payments` table with status `PENDING`.
  - `Transactions` table entry updated to `PAYMENT_PENDING`.
  - Notifications sent to both users.
  - Log entry created for payment initiation.

**Test Case 7: Submit Payment Evidence**
- **Preconditions:** Payment exists with status `PENDING`.
- **Steps:**
  1. User submits payment evidence.
  2. System updates the `Payments` table with status `PENDING`.
  3. System inserts a new entry into the `AdminManagement` table with status `CHECKING_PAYMENT_EVIDENCE`.
  4. System updates the `UserTransactionStatus` table with status `WAITING_CHECK_EVIDENCE`.
  5. System updates the `Transactions` table with status `PAYMENT_IN_PROGRESS`.
  6. System sends a notification to the admin.
  7. System logs the payment submission.
- **Expected Results:**
  - `Payments` table entry updated to `PENDING`.
  - New entry in `AdminManagement` table with status `CHECKING_PAYMENT_EVIDENCE`.
  - `UserTransactionStatus` entry updated to `WAITING_CHECK_EVIDENCE`.
  - `Transactions` table entry updated to `PAYMENT_IN_PROGRESS`.
  - Notification sent to admin.
  - Log entry created for payment submission.

#### Admin Check Payment

**Test Case 8: Payment Evidence Approved**
- **Preconditions:** Payment exists with status `PENDING`, admin management entry exists.
- **Steps:**
  1. Admin approves the payment evidence.
  2. System updates the `Payments` table with status `COMPLETED`.
  3. System updates the `AdminManagement` table with status `CHECKED_PAYMENT_COMPLETED`.
  4. System updates the `Transactions` table with status `PAYMENT_COMPLETED`.
  5. System updates the `UserTransactionStatus` table with status `PAYMENT_SUCCESS`.
  6. System sends notifications to both users.
  7. System logs the payment approval.
- **Expected Results:**
  - `Payments` table entry updated to `COMPLETED`.
  - `AdminManagement` entry updated to `CHECKED_PAYMENT_COMPLETED`.
  - `Transactions` table entry updated to `PAYMENT_COMPLETED`.
  - `UserTransactionStatus` entry updated to `PAYMENT_SUCCESS`.
  - Notifications sent to both users.
  - Log entry created for payment approval.

**Test Case 9: Payment Evidence Rejected**
- **Preconditions:** Payment exists with status `PENDING`, admin management entry exists.
- **Steps:**
  1. Admin rejects the payment evidence.
  2. System updates the `Payments` table with status `FAILED`.
  3. System updates the `AdminManagement` table with status `CHECKED_PAYMENT_FAILED`.
  4. System updates the `Transactions` table with status `PAYMENT_FAILED`.
  5. System updates the `UserTransactionStatus` table with status `PAYMENT_FAILED`.
  6. System sends notifications to both users.
  7. System logs the payment rejection.
- **Expected Results:**
  - `Payments` table entry updated to `FAILED`.
  - `AdminManagement` entry updated to `CHECKED_PAYMENT_FAILED`.
  - `Transactions` table entry updated to `PAYMENT_FAILED`.
  - `UserTransactionStatus` entry updated to `PAYMENT_FAILED`.
  - Notifications sent to both users.
  - Log entry created for payment rejection.

#### Address Exchange

**Test Case 10: Admin Sends Address to Users**
- **Preconditions:** Payment is approved.
- **Steps:**
  1. Admin sends address to users.
  2. System updates the `Transactions` table with status `ADDRESS_SENT`.
  3. System updates the `AdminManagement` table with status `SENDING_ADDRESS`.
  4. System updates the `UserTransactionStatus` table with status `RECEIVED_ADDRESS`.
  5. System sends notifications to both users.
  6. System logs the address sent.
- **Expected Results:**
  - `Transactions` table entry updated to `ADDRESS_SENT`.
  - `AdminManagement` entry updated to `SENDING_ADDRESS`.
  - `UserTransactionStatus` entry updated to `RECEIVED_ADDRESS`.
  - Notifications sent to both users.
  - Log entry created for address sent.

#### Book Shipment

**Test Case 11: User Sends Book to Admin**
- **Preconditions:** Users received the address.
- **Steps:**
  1. User sends book to admin.
  2. System updates the `UserTransactionStatus` table with status `SENDING_BOOK`.
  3. System updates the `AdminManagement` table with status `WAITING_BOOK`.
  4. System sends a notification to the admin.
  5. System logs the book shipment.
- **Expected Results:**
  - `UserTransactionStatus` entry updated to `SENDING_BOOK`.
  - `AdminManagement` entry updated to `WAITING_BOOK`.
  - Notification sent to admin.
  - Log entry created for book shipment.

#### Admin Receives Book

**Test Case 12: Admin Receives Book**
- **Preconditions:** Book is sent by the user.
- **Steps:**
  1. Admin receives the book.
  2. System updates the `AdminManagement` table with status `RECEIVED_BOOK`.
  3. System updates the `UserTransactionStatus` table with status `SEND_BOOK_COMPLETED`.
  4. System updates the `Transactions` table with status `SEND_BOOK_COMPLETED` after both books are received.
  5. System sends notifications to users about book receipt.
  6. System logs the book receipt.
- **Expected Results:**
  - `AdminManagement` entry updated to `RECEIVED_BOOK`.
  - `UserTransactionStatus` entry updated to `SEND_BOOK_COMPLETED`.
  - `Transactions` table entry updated to `SEND_BOOK_COMPLETED` after both books are received.
  - Notifications sent to users.
  - Log entry created for book receipt.

#### Admin Sends Book to User

**Test Case 13: Admin Sends Book to User**
- **Preconditions:** Admin has received the book.
- **Steps:**
  1. Admin sends the book to the user.
  2. System updates the `AdminManagement` table with status `SENDING_BOOK_TO_USER`.
  3. System updates the `UserTransactionStatus` table with status `WAITING_RECEIVED_BOOK`.
  4. System updates the `Transactions` table with status `SEND_BOOK_TO_USER`.
  5. System sends notifications to users about book shipment.
  6. System logs the book shipment.
- **Expected Results:**
  - `AdminManagement` entry updated to `SENDING_BOOK_TO_USER`.
  - `UserTransactionStatus` entry updated to `WAITING_RECEIVED_BOOK`.
  - `Transactions` table entry updated to `SEND_BOOK_TO_USER`.
  - Notifications sent to users.
  - Log entry created for book shipment.

#### User Receives Book

**Test Case 14: User Receives Book**
- **Preconditions:** Admin has sent the book to the user.
- **Steps:**
  1. User receives the book.
  2. System updates the `UserTransactionStatus` table with status `RECEIVED_BOOK`.
  3. System updates the `AdminManagement` table with status `COMPLETED`.
  4. System updates the `Transactions` table with status `COMPLETED` after both users confirm receipt.
  5. System sends notifications about transaction completion.
  6. System logs the transaction completion.
- **Expected Results:**
  - `UserTransactionStatus` entry updated to `RECEIVED_BOOK`.
  - `AdminManagement` entry updated to `COMPLETED`.
  - `Transactions` table entry updated to `COMPLETED` after both users confirm receipt.
  - Notifications sent about transaction completion.
  - Log entry created for transaction completion.

---

This comprehensive test plan should ensure thorough validation of each step in the exchange process, covering notifications, logging, and database updates.
