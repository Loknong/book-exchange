### Guest User Activities

1. **View Landing Page**
   - **APIs Used**: None

2. **Browse Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches all books)

3. **Search Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches books based on search criteria)

4. **Filter Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches books based on filter criteria)

5. **Sort Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches books based on sorting criteria)

6. **View Book Details**
   - **APIs Used**:
     - `GET /api/books/:bookId` (Fetches details of a specific book)

7. **Redirect to Login/Signup**
   - **APIs Used**:
     - `POST /api/auth/login` (Authenticates user)
     - `POST /api/auth/signup` (Registers new user)

### Authenticated User Activities

1. **Login**
   - **APIs Used**:
     - `POST /api/auth/login` (Authenticates user)

2. **Signup**
   - **APIs Used**:
     - `POST /api/auth/signup` (Registers new user)

3. **View Profile Details**
   - **APIs Used**:
     - `GET /api/users/profile` (Fetches user profile details)

4. **Update Profile Information**
   - **APIs Used**:
     - `PUT /api/users/profile` (Updates user profile information)

5. **Browse Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches all books)

6. **Search Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches books based on search criteria)

7. **Filter Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches books based on filter criteria)

8. **Sort Books**
   - **APIs Used**:
     - `GET /api/books` (Fetches books based on sorting criteria)

9. **View Book Details**
   - **APIs Used**:
     - `GET /api/books/:bookId` (Fetches details of a specific book)

10. **Make an Offer**
    - **APIs Used**:
      - `POST /api/offers` (Creates a new offer)

11. **Manage Offers**
    - **APIs Used**:
      - `GET /api/offers` (Fetches all offers)
      - `PUT /api/offers/:offerId` (Updates the status of an offer)

12. **Manage Transactions**
    - **APIs Used**:
      - `GET /api/transactions` (Fetches all transactions)
      - `PUT /api/transactions/:transactionId` (Updates the status of a transaction)

13. **Add Book**
    - **APIs Used**:
      - `POST /api/users/add-book` (Adds a new book to inventory)

14. **Manage Inventory**
    - **APIs Used**:
      - `GET /api/users/inventory` (Fetches user's inventory)
      - `PUT /api/users/manage-book/:bookId` (Updates details of a book in inventory)

15. **Notifications**
    - **APIs Used**:
      - `GET /api/notifications` (Fetches all notifications)
      - `PUT /api/notifications/:notificationId` (Marks a notification as read)

### Admin Activities

1. **Manage Users**
   - **APIs Used**:
     - `GET /api/admin/users` (Fetches all user profiles)
     - `PUT /api/admin/users/:userId` (Updates a user profile)
     - `DELETE /api/admin/users/:userId` (Deletes a user profile)

2. **Manage Books**
   - **APIs Used**:
     - `GET /api/admin/books` (Fetches all books)
     - `POST /api/books/add` (Adds a new book)
     - `PUT /api/books/:bookId` (Updates a book)
     - `DELETE /api/books/:bookId` (Deletes a book)

3. **Manage Offers**
   - **APIs Used**:
     - `GET /api/admin/offers` (Fetches all offers)

4. **Manage Transactions**
   - **APIs Used**:
     - `GET /api/admin/transactions` (Fetches all transactions)
     - `PUT /api/admin/transactions/:transactionId` (Updates a transaction)
     - `PUT /api/admin/transactions/:transactionId/approve` (Approves a transaction)
     - `PUT /api/admin/transactions/:transactionId/reject` (Rejects a transaction)

5. **View Statistics**
   - **APIs Used**:
     - `GET /api/admin/statistics` (Fetches various statistics)
     - `GET /api/admin/statistics/top-books` (Fetches top 10 books by genre)
     - `GET /api/admin/statistics/monitor` (Monitors app statistics)
