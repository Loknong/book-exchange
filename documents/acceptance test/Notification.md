
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
