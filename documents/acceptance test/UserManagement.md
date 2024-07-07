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
