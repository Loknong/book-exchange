### Project Features Overview

This document provides a comprehensive overview of our book exchange application, detailing the full range of functionalities and reviewing the features to ensure they cover all designed capabilities.

---

### What This Application Can Do

Our book exchange application supports the following functionalities:

1. **User Management**:
   - User registration and authentication.
   - Profile management and profile picture uploads.
   - Address management for users.
   - Handling user roles and permissions.

2. **Book Management**:
   - Browsing and exploring a catalog of books.
   - Searching, filtering, and sorting book listings.
   - Managing book genres.
   - Tracking and displaying book views.
   - Providing personalized book recommendations.

3. **Book Exchange Process**:
   - Creating, updating, and managing book exchange offers.
   - Handling book exchange transactions.
   - Managing payments for exchanges.
   - Tracking the status and history of exchanges.
   - Sending notifications related to exchange events.

4. **Administrative Functions**:
   - Approving or rejecting book exchange requests.
   - Managing users involved in the exchange process.
   - Overseeing the entire book exchange process and resolving disputes.

---

### Feature Review and Locations

#### User

1. **Auth**:
   - User Registration
   - User Login/Logout
   - Reset Password
   - **Location**: `/api/user/auth`

2. **Profiles**:
   - Create and Update User Profile
   - Upload Profile Picture
   - **Location**: `/api/user/profiles`

3. **Addresses**:
   - Add, Update, Delete User Address
   - Get User Addresses
   - **Location**: `/api/user/addresses`

---

#### Books

1. **Explore**:
   - Get Book Listings
   - Search Books by title, author, genre
   - Apply Filters and Sort Books
   - **Location**: `/api/books/explore`

2. **Genres**:
   - Add, Update, Delete Genre
   - Get All Genres
   - **Location**: `/api/books/genres`

3. **UserBooks**:
   - Add, Update, Delete User Books
   - Get User Books
   - **Location**: `/api/books/userBooks`

4. **Views**:
   - Track Book Views
   - Get Popular Books
   - Get Recently Viewed Books
   - Get Most Viewed Books
   - **Location**: `/api/books/views`

5. **Recommendations**:
   - Get Personalized Book Recommendations
   - **Location**: `/api/books/recommendations`

---

#### Book Exchange Process

1. **Offers**:
   - Create Offer
   - Update Offer
   - Get Offers
   - **Location**: `/api/exchange/offers`

2. **Transactions**:
   - Initiate Transaction
   - Get Transaction Status
   - Update Transaction Status
   - **Location**: `/api/exchange/transactions`

3. **Payments**:
   - Initiate Payment
   - Get Payment Status
   - Update Payment Status
   - **Location**: `/api/exchange/payments`

4. **Tracking**:
   - Track Exchange Status
   - Get Exchange History
   - **Location**: `/api/exchange/tracking`

5. **Notifications**:
   - Send Notifications for Exchange Events
   - Get User Notifications
   - **Location**: `/api/exchange/notifications`

---

#### Administrative Functions

1. **Admin**:
   - Approve Exchange Requests
   - Reject Exchange Requests
   - Manage Users Involved in Exchanges
   - **Location**: `/api/exchange/admin`
