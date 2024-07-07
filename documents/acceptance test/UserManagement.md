# Comprehensive Acceptance Test Plan for Book Exchange Application

This comprehensive test plan covers all functionalities of the book exchange application, ensuring a thorough validation of each feature.

## User Management
**Objective**: Ensure user management functionalities are working correctly, including registration, login, profile updates, and viewing user information.

**Scope:**
- User Registration
- User Login
- User Profile Update
- Viewing User Information

### Test Cases

**Test Case 1: User Registration**
- Preconditions: None
- Steps:
  1. User submits registration form.
  2. Check the Users table for a new entry.
  3. Verify the user receives a registration confirmation email.
  4. Check the logs for registration action.
- Expected Results: User is registered, receives a confirmation email, and the action is logged.

**Test Case 2: User Login**
- Preconditions: User is registered.
- Steps:
  1. User submits login form.
  2. Check the Users table for isLoggedIn status update.
  3. Verify the user receives a login confirmation message.
  4. Check the logs for login action.
- Expected Results: User is logged in, receives a confirmation message, and the action is logged.

**Test Case 3: User Profile Update**
- Preconditions: User is logged in.
- Steps:
  1. User updates profile information.
  2. Check the Users table for updated information.
  3. Verify the user receives a profile update confirmation message.
  4. Check the logs for profile update action.
- Expected Results: Profile information is updated, user is notified, and the action is logged.

**Test Case 4: Viewing User Information**
- Preconditions: User is logged in.
- Steps:
  1. User requests to view profile information.
  2. Check the Users table for user information retrieval.
  3. Verify the user receives their profile information.
  4. Check the logs for profile view action.
- Expected Results: User information is retrieved, user receives the information, and the action is logged.

## Book Management
**Objective**: Ensure book management functionalities are working correctly, including adding, updating, deleting, and viewing books.

**Scope:**
- Adding a Book
- Updating a Book
- Deleting a Book
- Viewing Books

### Test Cases

**Test Case 1: Adding a Book**
- Preconditions: User is logged in.
- Steps:
  1. User submits the add book form.
  2. Check the Books table for a new entry.
  3. Verify the user receives a book addition confirmation message.
  4. Check the logs for book addition action.
- Expected Results: Book is added, user is notified, and the action is logged.

**Test Case 2: Updating a Book**
- Preconditions: User is logged in, and a book exists.
- Steps:
  1. User submits the update book form.
  2. Check the Books table for updated information.
  3. Verify the user receives a book update confirmation message.
  4. Check the logs for book update action.
- Expected Results: Book information is updated, user is notified, and the action is logged.

**Test Case 3: Deleting a Book**
- Preconditions: User is logged in, and a book exists.
- Steps:
  1. User submits the delete book request.
  2. Check the Books table for book deletion.
  3. Verify the user receives a book deletion confirmation message.
  4. Check the logs for book deletion action.
- Expected Results: Book is deleted, user is notified, and the action is logged.

**Test Case 4: Viewing Books**
- Preconditions: User is logged in.
- Steps:
  1. User requests to view books.
  2. Check the Books table for book information retrieval.
  3. Verify the user receives the book information.
  4. Check the logs for book view action.
- Expected Results: Book information is retrieved, user receives the information, and the action is logged.

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

## Notifications
**Objective**: Ensure notification functionalities are working correctly, including sending and viewing notifications.

**Scope:**
- Sending a Notification
- Viewing Notifications

### Test Cases

**Test Case 1: Sending a Notification**
- Preconditions: User or system triggers an action that requires notification.
- Steps:
  1. System sends a notification.
  2. Check the Notifications table for a new entry.
  3. Verify the user receives the notification.
  4. Check the logs for notification action.
- Expected Results: Notification is sent, user receives it, and the action is logged.

**Test Case 2: Viewing Notifications**
- Preconditions: User is logged in.
- Steps:
  1. User requests to view their notifications.
  2. Check the Notifications table for notification information retrieval.
  3. Verify the user receives their notifications.
  4. Check the logs for notification view action.
- Expected Results: Notifications are retrieved, user receives them, and the action is logged.

## Logging
**Objective**: Ensure logging functionalities are working correctly, capturing all necessary actions and events.

**Scope:**
- Capturing Logs
- Viewing Logs

### Test Cases

**Test Case 1: Capturing Logs**
- Preconditions: User or system performs any action.
- Steps:
  1. Perform any action within the application.
  2. Check the Logs table for a new log entry corresponding to the action.
- Expected Results: Action is logged appropriately.

**Test Case 2: Viewing Logs**
- Preconditions: Admin is logged in.
- Steps:
  1. Admin requests to view logs.
  2. Check the Logs table for log information retrieval.
  3. Verify the admin receives the logs.
- Expected Results: Logs are retrieved and displayed to the admin.

## Comprehensive Testing Coverage
This comprehensive test plan covers all major functionalities of the book exchange application, ensuring thorough validation of each feature.
