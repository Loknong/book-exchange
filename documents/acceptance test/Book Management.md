
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
