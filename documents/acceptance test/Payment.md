
## Payment Management
**Objective**: Ensure payment management functionalities are working correctly, including initiating, updating, and viewing payment statuses.

**Scope:**
- Initiating a Payment
- Updating Payment Status
- Viewing Payment Status

### Test Cases

**Test Case 1: Initiating a Payment**
- Preconditions: Transaction exists with status CONFIRMED.
- Steps:
  1. User initiates a payment.
  2. Check the Payments table for a new entry with status PENDING.
  3. Check the Transactions table for status update to PAYMENT_PENDING.
  4. Verify both users receive payment details notification.
  5. Check the logs for payment initiation action.
- Expected Results: Payment is initiated, statuses are updated, users are notified, and the action is logged.

**Test Case 2: Updating Payment Status**
- Preconditions: Payment exists with status PENDING.
- Steps:
  1. User submits payment evidence.
  2. Check the Payments table for status update to PENDING.
  3. Check the AdminManagement table for a new entry with status CHECKING_PAYMENT_EVIDENCE.
  4. Check the UserTransactionStatus table for status update to WAITING_CHECK_EVIDENCE.
  5. Check the Transactions table for status update to PAYMENT_IN_PROGRESS.
  6. Verify admin receives a notification.
  7. Check the logs for payment submission action.
- Expected Results: Payment evidence is submitted, statuses are updated, admin is notified, and the action is logged.

**Test Case 3: Viewing Payment Status**
- Preconditions: User is logged in, and payment exists.
- Steps:
  1. User requests to view payment status.
  2. Check the Payments table for payment status retrieval.
  3. Verify the user receives their payment status.
  4. Check the logs for payment status view action.
- Expected Results: Payment status is retrieved, user receives the status, and the action is logged.
