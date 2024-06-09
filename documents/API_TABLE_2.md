# API List

## User Authentication

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Register a new user                          | /api/auth/signup                           | POST   | Body           | {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "username": "johndoe", "userPassword": "password123"} |
| Authenticate an existing user                | /api/auth/login                            | POST   | Body           | {"username": "johndoe", "userPassword": "password123"}                                                           |
| Log out the user                             | /api/auth/logout                           | POST   | Body           | {"userId": 1}                                                                                                   |
| Send a password reset link (Optional)        | /api/auth/forgot-password                  | POST   | Body           | {"username": "johndoe", "email": "john.doe@example.com"}                                                        |
| Reset the password                           | /api/auth/reset-password                   | POST   | Body           | {"userId": 1, "newPassword": "newpassword123"}                                                                  |
| Verify a user's email address using a token  | /api/auth/verify-email                     | POST   | Query Params   | /api/auth/verify-email?token=verification_token                                                                 |
| Resend the email verification link           | /api/auth/resend-verification-email        | POST   | Body           | {"email": "john.doe@example.com"}                                                                               |

## User Management

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Get user profile details                     | /api/users/profile                         | GET    | None           |                                                                                                                 |
| Update user profile                          | /api/users/profile                         | PUT    | Body           | {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com"}                                       |
| Add a book to user's inventory               | /api/users/add-book                        | POST   | Body           | {"title": "Book Title", "author": "Author Name", "genreId": 1}                                                  |
| Get user's book inventory                    | /api/users/inventory                       | GET    | None           |                                                                                                                 |
| Update book status (e.g., public/private)    | /api/users/manage-book/:bookId             | PUT    | Params, Body   | /api/users/manage-book/1 {"status": "public"}                                                                   |
| Change the user's password                   | /api/users/change-password                 | PUT    | Body           | {"oldPassword": "oldpassword", "newPassword": "newpassword"}                                                    |
| Upload a profile picture                     | /api/users/profile-picture                 | POST   | Form Data      |                                                                                                                 |
| Delete a user account                        | /api/users                                 | DELETE | Body           | {"userId": 1}                                                                                                   |

## Book Management

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Get list of all books (search and filtering) | /api/books                                 | GET    | Query Params   | /api/books?search=title&filter=genre&sort=latest                                                                |
| Get details of a specific book               | /api/books/:bookId                         | GET    | Params         | /api/books/1                                                                                                    |
| Add a new book (for admin use)               | /api/books/add                             | POST   | Body           | {"title": "Book Title", "author": "Author Name", "genreId": 1}                                                  |
| Update details of a specific book (admin)    | /api/books/:bookId                         | PUT    | Params, Body   | /api/books/1 {"title": "New Title", "author": "New Author", "genreId": 2}                                       |
| Delete a specific book (for admin use)       | /api/books/:bookId                         | DELETE | Params         | /api/books/1                                                                                                    |
| Get all book categories                      | /api/books/genre                           | GET    | None           |                                                                                                                 |
| Add a new book category (admin use)          | /api/books/genre                           | POST   | Body           | {"genreName": "Science Fiction"}                                                                                |
| Update a book category (admin use)           | /api/books/genre/:genreId                  | PUT    | Params, Body   | /api/books/genre/1 {"genreName": "Sci-Fi"}                                                                      |
| Delete a book category (admin use)           | /api/books/genre/:genreId                  | DELETE | Params         | /api/books/genre/1                                                                                              |

## Offer Management

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Make an offer on a book                      | /api/offers                                | POST   | Body           | {"bookId": 1, "offeredBy": 2, "offeredTo": 3, "offerDetails": "Would you like to exchange?"}                    |
| Get a list of all offers for a user          | /api/offers                                | GET    | Query Params   | /api/offers?userId=2                                                                                           |
| Get details of a specific offer              | /api/offers/:offerId                       | GET    | Params         | /api/offers/1                                                                                                   |
| Update status of an offer (accept/reject)    | /api/offers/:offerId                       | PUT    | Params, Body   | /api/offers/1 {"status": "ACCEPTED"}                                                                            |
| Get offer history for the user               | /api/users/offers/history                  | GET    | Query Params   | /api/users/offers/history?userId=2                                                                              |

## Transaction Management

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Create a new transaction after an offer      | /api/transactions                          | POST   | Body           | {"offerId": 1, "status": "PENDING"}                                                                             |
| Get a list of all transactions for a user    | /api/transactions                          | GET    | Query Params   | /api/transactions?userId=2                                                                                      |
| Get details of a specific transaction        | /api/transactions/:transactionId           | GET    | Params         | /api/transactions/1                                                                                            |
| Update status of a transaction               | /api/transactions/:transactionId           | PUT    | Params, Body   | /api/transactions/1 {"status": "COMPLETED"}                                                                     |
| Get tracking information for a transaction   | /api/transactions/:transactionId/tracking  | GET    | Params         | /api/transactions/1/tracking                                                                                    |
| Approve a transaction (admin use)            | /api/admin/transactions/:transactionId/approve | PUT    | Params         | /api/admin/transactions/1/approve                                                                              |
| Reject a transaction (admin use)             | /api/admin/transactions/:transactionId/reject | PUT    | Params         | /api/admin/transactions/1/reject                                                                               |

## Notification Management

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Get all notifications for a user             | /api/notifications                         | GET    | Query Params   | /api/notifications?userId=2                                                                                     |
| Mark a notification as read                  | /api/notifications/:notificationId         | PUT    | Params         | /api/notifications/1                                                                                           |

## Ranking and Statistics

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Get top 10 books for each genre              | /api/rankings/:genreId                     | GET    | Params         | /api/rankings/1                                                                                                 |
| Get various statistics                       | /api/statistics                            | GET    | None           |                                                                                                                 |
| Get user activity statistics                 | /api/statistics/user-activity              | GET    | None           |                                                                                                                 |

## Admin Management

| Description                            | API Endpoint                               | Method | Request Part   | Example                                                                                                         |
|----------------------------------------------|--------------------------------------------|--------|----------------|-----------------------------------------------------------------------------------------------------------------|
| Get all books (including private)            | /api/admin/books                           | GET    | None           |                                                                                                                 |
| Get all offers                               | /api/admin/offers                          | GET    | None           |                                                                                                                 |
| Get all transactions                         | /api/admin/transactions                    | GET    | None           |                                                                                                                 |
| Manage book statuses in transactions         | /api/admin/transactions/:transactionId     | PUT    | Params, Body   | /api/admin/transactions/1 {"adminStatus": "RECEIVED"}                                                           |
