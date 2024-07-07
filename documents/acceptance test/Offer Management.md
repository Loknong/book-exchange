
## Offer Management
**Objective**: Ensure offer management functionalities are working correctly, including creating, updating, and viewing offers.

**Scope:**
- Creating an Offer
- Updating an Offer
- Viewing Offers

### Test Cases

**Test Case 1: Creating an Offer**
- Preconditions: User is logged in, and a book exists.
- Steps:
  1. User submits the create offer form.
  2. Check the Offers table for a new entry with status PENDING.
  3. Verify the book owner receives a notification.
  4. Check the logs for offer creation action.
- Expected Results: Offer is created, book owner is notified, and the action is logged.

**Test Case 2: Updating an Offer**
- Preconditions: Offer exists with status PENDING.
- Steps:
  1. Book owner updates the offer status.
  2. Check the Offers table for status update to ACCEPTED or REJECTED.
  3. Verify the interested user receives a notification.
  4. Check the logs for offer update action.
- Expected Results: Offer status is updated, user is notified, and the action is logged.

**Test Case 3: Viewing Offers**
- Preconditions: User is logged in.
- Steps:
  1. User requests to view their offers.
  2. Check the Offers table for offer information retrieval.
  3. Verify the user receives their offer information.
  4. Check the logs for offer view action.
- Expected Results: Offer information is retrieved, user receives the information, and the action is logged.
