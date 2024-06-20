# Conceptual Framework for Business Logic

## User Management

### Registration
- **Tables**: Users, UserProfilePictures
- **Actions**: Create a new user, add a profile picture.

### Login
- **Tables**: Users
- **Actions**: Validate user credentials.

### Profile Update
- **Tables**: Users, UserProfilePictures
- **Actions**: Update user details, update/add profile picture.

### Password Reset
- **Tables**: Users
- **Actions**: Update user password.

## Book and Genre Management

### Add Book
- **Tables**: Books, BookImages
- **Actions**: Create a new book entry, add a book image.

### Update Book
- **Tables**: Books, BookImages
- **Actions**: Update book details, update book image.

### Delete Book
- **Tables**: Books, BookImages
- **Actions**: Remove book entry, remove associated image.

### View Book Details
- **Tables**: Books, BookImages, Genres, Users
- **Actions**: Retrieve detailed information about a book.

### Search Books
- **Tables**: Books, Genres
- **Actions**: Search for books based on criteria.

### Genre Operations (Add, Update, Delete, View)
- **Tables**: Genres
- **Actions**: Manage genre entries.

## Offer Management

### Make Offer
- **Tables**: Offers, Books, Users
- **Actions**: Create a new offer for a book.

### Accept Offer
- **Tables**: Offers, Books, Users, Transactions
- **Actions**: Accept an offer, initiate transaction.

### Reject Offer
- **Tables**: Offers
- **Actions**: Reject an offer.

### Cancel Offer
- **Tables**: Offers
- **Actions**: Cancel an offer.

## Transaction Management

### Initiate Transaction
- **Tables**: Transactions, Offers, Users, Payments
- **Actions**: Start a transaction based on an accepted offer.

### Update Transaction Status
- **Tables**: Transactions, UserTransactionStatus
- **Actions**: Update the status of a transaction.

### View Transaction History
- **Tables**: Transactions, UserTransactionStatus, Users
- **Actions**: Retrieve transaction history for a user.

## Notification Management

### Send Notification
- **Tables**: Notifications, Users
- **Actions**: Send a notification to a user.

### View Notifications
- **Tables**: Notifications, Users
- **Actions**: Retrieve notifications for a user.

# Business Logic Type Separation

Each business logic type will be organized into its own file within the services directory, focusing on the specific type of task it performs. This ensures modularity and easier maintenance.

## Proposed Directory Structure

src/services
userManagement.services.ts
- registerUser
- loginUser
- updateUserProfile
- resetPassword

bookManagement.services.ts
- addBook
- updateBook
- deleteBook
- viewBookDetails
- searchBooks
- addGenre
- updateGenre
- deleteGenre
- viewGenres

offerManagement.services.ts
- makeOffer
- acceptOffer
- rejectOffer
- cancelOffer

transactionManagement.services.ts
- initiateTransaction
- updateTransactionStatus
- viewTransactionHistory

notificationManagement.services.ts
- sendNotification
- viewNotifications


# Summary of Conceptual Approach

- **User Management**: Handling all user-related actions.
- **Book and Genre Management**: Handling book and genre-related actions, ensuring books and genres are managed together since they are closely related.
- **Offer Management**: Handling the lifecycle of offers from creation to acceptance or rejection.
- **Transaction Management**: Handling transactions, ensuring all operations are tracked and managed correctly.
- **Notification Management**: Handling notifications, ensuring users are kept informed of relevant events.

By structuring the business logic in this way, we ensure a clean separation of concerns, making the system more maintainable and scalable. This design-first approach will guide the implementation, ensuring that coding is straightforward and focused on implementing well-defined functionality.
