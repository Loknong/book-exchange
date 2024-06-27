### User Book

**User Book** encompasses functionalities related to managing books that are specific to a user.

**Common Elements**:

- User-Specific Books: Books added by a user.
- Book Management: Adding, updating, and deleting books.

**Usage**:

- Allowing users to manage their own book listings.
- Displaying books added by a specific user.

**Example Use Case**:

- Add User Book: Adding a new book to a user's list.
- Update User Book: Updating an existing book in a user's list.
- Delete User Book: Removing a book from a user's list.
- Get User Books: Retrieving books added by a specific user.

**Features List**:

1. Add User Book:

   - Endpoint to add a new book to a user's list.
   - Example: POST /books/userBook

2. Update User Book:

   - Endpoint to update an existing book in a user's list.
   - Example: PUT /books/userBook/:bookId

3. Delete User Book:

   - Endpoint to remove a book from a user's list.
   - Example: DELETE /books/userBook/:bookId

4. Get User Books:
   - Endpoint to retrieve books added by a specific user.
   - Example: GET /books/userBook/:userId

**Additional**:


