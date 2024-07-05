## Users

**Users** encompasses all functionalities related to managing user-related actions within the application, including addresses, authentication, profiles, and comprehensive user information. Each subfolder is dedicated to handling specific aspects of user management to ensure modularity and maintainability.

### Addresses

**Features List**:

1. **Add User Address**:

   - Endpoint `POST /user/addresses`
   - Description: Adds a new user address.
   - Table: UserAddress, Users
   - When to Use: When a user wants to add a new address to their profile.

     **Response**

   ```
   {
      "message": "Address added successfully",
      "data": {
         "id": 1,
         "userId": 123,
         "houseNumber": "123",
         "village": "Village Name",
         "street": "Street Name",
         "subdistrict": "Subdistrict",
         "district": "District",
         "province": "Province",
         "postalCode": "12345",
         "country": "Thailand",
         "phoneNumber": "0812345678",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
      }
   }

   ```

2. **Get User Addresses**:

   - Endpoint `GET /users/addresses/:userId`
   - Description: Retrieves all addresses associated with a user.
   - Table : UserAddress
   - When to Use: When the application needs to display all addresses of a user, such as on a profile or address management page.

   **Response**

   ```
   {
   "message": "User addresses retrieved successfully",
   "data": [
         {
            "id": 1,
            "userId": 123,
            "houseNumber": "123",
            "village": "Village Name",
            "street": "Street Name",
            "subdistrict": "Subdistrict",
            "district": "District",
            "province": "Province",
            "postalCode": "12345",
            "country": "Thailand",
            "phoneNumber": "0812345678",
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         },
         {
            "id": 2,
            "userId": 123,
            "houseNumber": "456",
            "village": "Another Village",
            "street": "Another Street",
            "subdistrict": "Another Subdistrict",
            "district": "Another District",
            "province": "Another Province",
            "postalCode": "67890",
            "country": "Thailand",
            "phoneNumber": "0898765432",
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         }
      ]
   }


   ```

3. **Update User Address**:

   - Endpoint `PUT /users/addresses/:addressId`
   - Description: Updates an existing user address.
   - Table: UserAddress
   - When to Use: When a user wants to update their address information.

   **Response**

   ```
   {
      "message": "Address updated successfully",
      "data": {
         "id": 1,
         "userId": 123,
         "houseNumber": "789",
         "village": "Updated Village",
         "street": "Updated Street",
         "subdistrict": "Updated Subdistrict",
         "district": "Updated District",
         "province": "Updated Province",
         "postalCode": "54321",
         "country": "Thailand",
         "phoneNumber": "0801234567",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
      }
   }


   ```

4. **Delete User Address**:

   - Endpoint `DELETE /users/addresses/:addressId`
   - Description: Deletes a user address.
   - Table: UserAddress
   - When to Use: When a user wants to remove an address from their profile.

   **Response**

   ```
   {
      "message": "Address deleted successfully",
      "data": {
         "id": 1,
         "userId": 123,
         "houseNumber": "789",
         "village": "Updated Village",
         "street": "Updated Street",
         "subdistrict": "Updated Subdistrict",
         "district": "Updated District",
         "province": "Updated Province",
         "postalCode": "54321",
         "country": "Thailand",
         "phoneNumber": "0801234567",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
      }
   }


   ```

### Auth

**Features List**:

1. **Register User:**

   - Endpoint `POST /users/auth/register`
   - Description: Registers a new user.
   - Table: Users
   - When to Use: When a new user signs up for the application.

   **Response**

   ```
   {
      "message": "User registered successfully",
      "data": {
         "id": 123,
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@example.com",
         "username": "johndoe"
      }
   }

   ```

2. **Login User:**

   - Endpoint `POST /users/auth/login`
   - Description: Logs in a user.
   - Table: Users
   - When to Use: When a user attempts to log in to the application.

   **Response**

   ```
   {
      "message": "User logged in successfully",
      "data": {
         "id": 123,
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@example.com",
         "username": "johndoe",
         "credit": 100,
         "isLoggedIn": true
      }
   }

   ```

3. **Logout User:**

   - Endpoint `PUT /users/auth/logout`
   - Description: Logs out a user.
   - Table: Users
   - When to Use: When a user logs out of the application.

   **Response**

   ```
   {
      "message": "User logged out successfully",
      "data": {
         "id": 123,
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@example.com",
         "username": "johndoe",
        "isLoggedIn": false
      }
   }
   ```

### Profile

**Features List**:

1. [x] **Get User Profile:**

   - Endpoint `GET /users/profiles/:userId`
   - Description: Retrieves user profile details.
   - Query Parameters:
      <!-- - details: boolean (Optional) - Whether to include detailed user information. -->
      - withAddress: boolean (Optional) - Whether to include user addresses.
      - withPicture: boolean (Optional) - Whether to include user profile picture.
      <!-- - roles: boolean (Optional) - Whether to include user roles and permissions. -->
      <!-- - activityLogs: boolean (Optional) - Whether to include user activity logs. -->
      <!-- - accountStatus: boolean (Optional) - Whether to include user account status. -->
      <!-- - transactions: boolean (Optional) - Whether to include user transaction history. -->
      - notifications: boolean (Optional) - Whether to include user notifications.
   - Table: Users, UserAddress, UserProfilePictures, Roles, ActivityLogs, Transactions, Notifications
   - When to Use: When displaying user information based on specified criteria, such as on an admin panel or user profile page.

  **Response**

  ```
  {
  "message": "User info retrieved successfully",
  "data": {
    "user": {
      "id": 123,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "username": "johndoe",
      "roles": ["Regular User"],
      "addresses": [
        {
          "id": 1,
          "houseNumber": "123",
          "village": "Village Name",
          "street": "Street Name",
          "subdistrict": "Subdistrict",
          "district": "District",
          "province": "Province",
          "postalCode": "12345",
          "country": "Thailand"
        }
      ],
      "profilePicture": {
        "id": 1,
        "name": "profile_pic.jpg",
        "isActive": true
      },
      "activityLogs": [
        {
          "id": 1,
          "action": "Logged In",
          "timestamp": "2023-01-01T00:00:00.000Z"
        }
      ],
      "transactions": [
        {
          "id": 1,
          "status": "COMPLETED",
          "details": "Book exchange completed",
          "timestamp": "2023-01-01T00:00:00.000Z"
        }
      ],
      "notifications": [
        {
          "id": 1,
          "message": "Your exchange offer was accepted",
          "timestamp": "2023-01-01T00:00:00.000Z"
        }
      ],
      "accountStatus": "Active"
    }
  }
  }


  ```

2. [x] **Update User Profile:**

- Endpoint `PUT /users/profiles/:userId`
- Description: Updates user profile details.
- Table: Users
- When to Use: When a user wants to update their profile information.

  **Response**

  ```
  {
     "message": "User profile updated successfully",
      "data": {
         "id": 123,
         "firstName": "John",
         "lastName": "Doe",
         "email": "john.doe@example.com",
         "username": "johndoe"
      }
  }

  ```

3. [x] **Add Profile Picture:**

- Endpoint `POST /users/profiles/picture/:userId`
- Description: Adds a profile picture for a user.
- Table: UserProfilePictures
- When to Use: When a user wants to upload a new profile picture.

  **Response**

  ```
  {
  "message": "Profile picture added successfully",
     "data": {
        "id": 1,
        "userId": 123,
        "name": "profile_pic.jpg",
        "isActive": true,
        "createdAt": "2023-01-01T00:00:00.000Z",
        "isDeleted": false
     }
  }

  ```

4. [ ] **Delete Profile Picture:**

- Endpoint `DELETE /users/profiles/picture/:userId`
- Description: Deletes a profile picture for a user.
- Table: UserProfilePictures
- When to Use: When a user wants to delete their current profile picture.

  **Response**

  ```
   {
      "message": "Profile picture deleted successfully",
      "data": {
         "id": 1,
         "userId": 123,
         "name": "profile_pic.jpg",
         "isActive": false,
         "createdAt": "2023-01-01T00:00:00.000Z",
         "isDeleted": true
      }
   }

  ```

### Possible Roles Idea

| Role              | Description                                          | Permissions                                                                                                             |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Admin**         | Full access to all aspects of the application.       | Manage users, approve/reject exchanges, manage listings, access all data, manage transactions, send notifications, etc. |
| **Moderator**     | Oversee user activity and manage content.            | Monitor activity, approve/reject listings, handle disputes, ban users, view transactions, send notifications.           |
| **Verified User** | Trusted users with additional privileges.            | List books, make/accept offers, leave reviews, view detailed transactions, access exclusive listings, report issues.    |
| **Regular User**  | General members with access to core functionalities. | Manage profile, list books, make/accept offers, view transaction history, leave reviews, receive notifications.         |
| **Guest**         | Limited access, primarily for browsing.              | Browse listings, view details, register for an account.                                                                 |

```

```
