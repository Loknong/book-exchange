# Conceptual Framework for Business Logic

## User Management

### Registration

- **Tables**: Users, UserProfilePictures
- **Actions**: Create a new user, add a profile picture.
- **Request Type**:
  ```typescript
  interface RegisterUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    profilePicture?: string;
  }
  ```
- **Request Type**:
  ```typescript
  interface RegisterUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePictureUrl?: string;
  }
  ```

### Login

- **Tables**: Users
- **Actions**: Validate user credentials.
- **Request Type**:

  ```typescript
  interface LoginRequest {
    email: string;
    password: string;
  }
  ```

- **Response Type**:

    ```typescript
    interface LoginResponse {
        id: number;
        email: string;
        username: string;
        token: string;
    }
    ```

### Profile Update

- **Tables**: Users, UserProfilePictures
- **Actions**: Update user details, update/add profile picture.
- **Request Type**:

    ```typescript
    interface UpdateUserProfileRequest {
        firstName?: string;
        lastName?: string;
        email?: string;
        username?: string;
        profilePicture?: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface UpdateUserProfileResponse {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        profilePictureUrl?: string;
    }
    ```

### Password Reset

- **Tables**: Users
- **Actions**: Update user password.
- **Request Type**:

    ```typescript
    interface ResetPasswordRequest {
        email: string;
        newPassword: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface ResetPasswordResponse {
        message: string;
    }
    ```

## Book and Genre Management

### Add Book

- **Tables**: Books, BookImages
- **Actions**: Create a new book entry, add a book image.
- **Request Type**:

    ```typescript
    interface AddBookRequest {
        title: string;
        author?: string;
        genreId: number;
        condition: string;
        description?: string;
        ownerId: number;
        bookImage?: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface AddBookResponse {
        id: number;
        title: string;
        author?: string;
        genreId: number;
        condition: string;
        description?: string;
        ownerId: number;
        bookImageUrl?: string;
    }
    ```

### Update Book

- **Tables**: Books, BookImages
- **Actions**: Update book details, update book image.
- **Request Type**:

    ```typescript
    interface UpdateBookRequest {
        title?: string;
        author?: string;
        genreId?: number;
        condition?: string;
        description?: string;
        bookImage?: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface UpdateBookResponse {
        id: number;
        title: string;
        author?: string;
        genreId: number;
        condition: string;
        description?: string;
        bookImageUrl?: string;
    }
    ```

### Delete Book

- **Tables**: Books, BookImages
- **Actions**: Remove book entry, remove associated image.
- **Request Type**:

    ```typescript
        interface DeleteBookRequest {
        bookId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface DeleteBookResponse {
        message: string;
    }
    ```

### View Book Details

- **Tables**: Books, BookImages, Genres, Users
- **Actions**: Retrieve detailed information about a book.
- **Request Type**:

    ```typescript

    interface ViewBookDetailsRequest {
        bookId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface ViewBookDetailsResponse {
        id: number;
        title: string;
        author?: string;
        genre: string;
        condition: string;
        description?: string;
        owner: {
        id: number;
        firstName: string;
        lastName: string;
        };
        bookImageUrl?: string;
    }
    ```

### Search Books

- **Tables**: Books, Genres
- **Actions**: Search for books based on criteria.
- **Request Type**:

    ```typescript
    interface SearchBooksRequest {
        title?: string;
        author?: string;
        genreId?: number;
        condition?: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface SearchBooksResponse {
        books: {
            id: number;
            title: string;
            author?: string;
            genre: string;
            condition: string;
            description?: string;
            bookImageUrl?: string;
        }[];
    }
    ```

### Genre Operations (Add, Update, Delete, View)

- **Tables**: Genres
- **Actions**: Manage genre entries.

#### Add Genre

- **Request Type**:

    ```typescript
    interface AddGenreRequest {
        name: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface AddGenreResponse {
        id: number;
        name: string;
    }
    ```

### Update Genre

- **Response Type**:

    ```typescript
    interface UpdateGenreRequest {
        id: number;
        name: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface UpdateGenreResponse {
        id: number;
        name: string;
    }
    ```

### Delete Genre

- **Request Type**:

    ```typescript
    interface DeleteGenreRequest {
        id: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface DeleteGenreResponse {
        message: string;
    }
    ```

### View Genres

- **Request Type**:

    ```typescript
    interface ViewGenresRequest {}
    ```

- **Response Type**:

    ```typescript
    interface ViewGenresResponse {
        genres: {
            id: number;
            name: string;
        }[];
    }
    ```

## Offer Management

### Make Offer

- **Tables**: Offers, Books, Users
- **Actions**: Create a new offer for a book.

- **Request Type**:

    ```typescript
    interface MakeOfferRequest {
        bookId: number;
        offeredTo: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface MakeOfferResponse {
        id: number;
        bookId: number;
        offeredBy: number;
        offeredTo: number;
        status: string;
    }
    ```

### Accept Offer

- **Tables**: Offers, Books, Users, Transactions
- **Actions**: Accept an offer, initiate transaction.

- **Request Type**:

    ```typescript
    interface AcceptOfferRequest {
        offerId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface AcceptOfferResponse {
        id: number;
        bookId: number;
        offeredBy: number;
        offeredTo: number;
        status: string;
    }
    ```

### Reject Offer

- **Tables**: Offers
- **Actions**: Reject an offer.

- **Request Type**:

    ```typescript
    interface RejectOfferRequest {
        offerId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface RejectOfferResponse {
        message: string;
    }
    ```

### Cancel Offer

- **Tables**: Offers
- **Actions**: Cancel an offer.

- **Request Type**:

    ```typescript
    interface CancelOfferRequest {
        offerId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface CancelOfferResponse {
        message: string;
    }
    ```

## Transaction Management

### Initiate Transaction

- **Tables**: Transactions, Offers, Users, Payments
- **Actions**: Start a transaction based on an accepted offer.

- **Request Type**:

    ```typescript
    interface InitiateTransactionRequest {
        offerId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface InitiateTransactionResponse {
        id: number;
        offerId: number;
        status: string;
    }
    ```

## Update Transaction Status

- **Tables**: Transactions, UserTransactionStatus
- **Actions**: Update the status of a transaction.

- **Request Type**:

    ```typescript
    interface UpdateTransactionStatusRequest {
        transactionId: number;
        status: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface UpdateTransactionStatusResponse {
        id: number;
        offerId: number;
        status: string;
    }
    ```

### View Transaction History

- **Tables**: Transactions, UserTransactionStatus, Users
- **Actions**: Retrieve transaction history for a user.

- **Request Type**:

    ```typescript
    interface ViewTransactionHistoryRequest {
        userId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface ViewTransactionHistoryResponse {
    transactions: {
        id: number;
        offerId: number;
        status: string;
        createdAt: string;
        updatedAt: string;
    }[];
    }
    ```

## Notification Management

### Send Notification

- **Tables**: Notifications, Users
- **Actions**: Send a notification to a user.

- **Request Type**:

    ```typescript
    interface SendNotificationRequest {
        userId: number;
        message: string;
    }
    ```

- **Response Type**:

    ```typescript
    interface SendNotificationResponse {
        id: number;
        userId: number;
        message: string;
        createdAt: string;
    }
    ```

### View Notifications

- **Tables**: Notifications, Users
- **Actions**: Retrieve notifications for a user.

- **Request Type**:

    ```typescript
    interface ViewNotificationsRequest {
        userId: number;
    }
    ```

- **Response Type**:

    ```typescript
    interface ViewNotificationsResponse {
        notifications: {
            id: number;
            message: string;
            createdAt: string;
        }[];
    }
    ```

# Business Logic Type Separation

Each business logic type will be organized into its own file within the services directory, focusing on the specific type of task it performs. This ensures modularity and easier maintenance.

### Proposed Directory Structure

```markdown
# src/services
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
```
