# API List

## User Authentication

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Authenticate an existing user
- POST /api/auth/logout - Log out the user
- POST /api/auth/forgot-password - Send a password reset link (Optional)
- POST /api/auth/reset-password - Reset the password
- POST /api/auth/verify-email - Verify a user's email address using a token.
- POST /api/auth/resend-verification-email - Resend the email verification link.

## User Management

- GET /api/users/profile - Get user profile details
- PUT /api/users/profile - Update user profile
- POST /api/users/add-book - Add a book to users's inventory
- GET /api/users/inventory - Get user's book inventory
- PUT /api/users/manage-book/:bookId - Update book status (e.g, public/ private)
- PUT /api/users/change-password - Change the user's password.
- POST /api/users/profile-picture - Upload a profile picture.
- DELETE /api/users - Delete a user account.

## Book Management

- GET /api/books - Get list of all books (support search and filtering)
- GET /api/books/:bookId - Get detials of a specific book.
- POST /api/books/add - Add a new book (for admin use).
- PUT /api/books/:bookId - Update details of a specific book (for admin use).
- DELETE /api/books/:bookId - Delete a specific book (for admin use).
- GET /api/books/genre - Get all book categories.
- POST /api/books/genre - Add a new book category (admin use).
- PUT /api/books/genre/:genreId - Update a book category (admin use).
- DELETE /api/books/genre/:genreId - Delete a book category (admin use).

## Offer Management

- POST /api/offers - Make an offer on a books.
- GET /api/offers - Get a list of all offers for a user.
- GET /api/offers/:offerId - Get details of a specific offer.
- PUT /api/offers/:offerId - Update status of an offer (accept/ reject).
- GET /api/users/offers/history - Get offer history for the user.

## Transaction Mangement

- POST /api/transactions - Create a new transaction after an offer is acceptd.
- GET /api/transactions - Get a list of all transactions for a user
- GET /api/transactions - Get detail of a specific transaction.
- PUT /api/transactions/:transactionId - Update status of a transcation (confirmation, payment, etc.).
- GET /api/transactions/:transactionId/tracking - Get tracking information for a specific transaction.
- PUT /api/admin/transactions/:transactionId/approve - Approve a transaction (admin use).
- PUT /api/admin/transactions/:transactionId/reject - Reject a transaction (admin use).

## Notification Management

- GET /api/notifications - Get all notifications for a user
- PUT /api/notifications/:notificationId - Mark a notification as read

## Ranking and Statistics

- GET /api/rankings/:genreId - Get top 10 books for each genre
- GET /api/statistics - Get various statistics (e.g. most viewed books, etc.).
- GET /api/statistics/user-activity - Get user activity statistics (e.g., most active users).

## Admin Management

- GET /api/admin/books - Get all book (including private).
- GET /api/admin/offers - Get all offers.
- GET /api/admin/transactions - GET all transactions.
- PUT /api/admin/transactions/:transactionId - Manage book statuses in transactions.
