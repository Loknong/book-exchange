## API LIST

### Console

#### Database

1. Test DB Connection
    - `GET base/test-prisma`
2. Clear Tables
    - `POST /database/reset`
3. Mock Data
    - `POST /database/mock`
4. Reset Database -> Delete all then insert Mock Data of Users and Books.
    - `POST /database/setup`
5. Desc Table




### Books

#### Explore

1. Get Book Listings
   - `GET /books/explore`

#### Genres

1. Add Genre
   - `POST /books/genres`
2. Get Genres
   - `GET /books/genres`
3. Update Genre
   - `PUT /books/genres/:genreId`
4. Delete Genre
   - `DELETE /books/genres/:genreId`

#### UserBooks

1. Add User Book
   - `POST /books/userBooks`
2. Get User Books
   - `GET /books/userBooks/:userId`
3. Update User Book
   - `PUT /books/userBooks/:bookId`
4. Delete User Book
   - `DELETE /books/userBooks/:bookId`

#### Views

1. Track Book Views
   - `POST /books/views`
2. Get Popular Books
   - `GET /books/views/popular`
3. Get Recently Viewed Books
   - `GET /books/views/recent`
4. Get Most Viewed Books
   - `GET /books/views/most`

#### Recommendations

1. Get Personalized Book Recommendations
   - `GET /books/recommendations`

### Users

#### Addresses

1. Add User Address
   - `POST /user/addresses`
2. Get User Addresses
   - `GET /users/addresses/:userId`
3. Update User Address
   - `PUT /users/addresses/:addressId`
4. Delete User Address
   - `DELETE /users/addresses/:addressId`

#### Auth

1. Register User
   - `POST /users/auth/register`
2. Login User
   - `POST /users/auth/login`
3. Logout User
   - `PUT /users/auth/logout`

#### Profiles

1. Get User Profile
   - `GET /users/profiles/:userId`
2. Update User Profile
   - `PUT /users/profiles/:userId`
3. Add Profile Picture
   - `POST /users/profiles/picture/:userId`
4. Delete Profile Picture
   - `DELETE /users/profiles/picture/:userId`

### Exchange Process

1. Create Offer
   - `POST /exchange/offers`
2. Update Offer
   - `POST /exchange/offers/:offerId`
3. Initiate Transaction
   - `POST /exchange/transactions`
4. Update Transaction Status
   - `PUT /exchange/transactions/:transactionId`
5. Initiate Payment
   - `POST /exchange/payments`
6. Update Payment Status
   - `PUT /exchange/payments/:paymentId`
7. Check Payment Evidence
   - `PUT /exchange/admin/checkPayment/:paymentId`
8. Receive Book
   - `PUT /exchange/admin/receiveBook/:transactionId`
9. Send Book to User
   - `PUT /exchange/admin/sendBook/:transactionId`
10. Create User Transaction Status
    - `POST /exchange/user-transaction-status`
11. Update User Transaction Status
    - `PUT /exchange/user-transaction-status/:userId`
12. Get Offers
    - `GET /exchange/offers/:userId`
13. Get Payment Status
    - `GET /exchange/payments/:paymentId`
14. Get Transaction Status
    - `GET /exchange/transactions/:transactionId`
15. Track Exchange
    - `GET /exchange/tracking/:exchangeId`
16. Get Exchange History
    - `GET /exchange/tracking/history/:exchangeId`
17. Notify User
    - `POST /exchange/notifications`
18. Get Notifications
    - `GET /exchange/notifications/:userId`
19. Manage Users
    - `GET /exchange/admin/users`
