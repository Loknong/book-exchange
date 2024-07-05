## Users

**Users** encompasses all functionalities related to managing user-related actions within the application, including addresses, authentication, profiles, and comprehensive user information. Each subfolder is dedicated to handling specific aspects of user management to ensure modularity and maintainability.

### Addresses

**Addresses** encompasses functionalities related to managing user addresses within the application.

**Common Elements:**:

- User Addresses: CRUD operations for addresses associated with a user.

**Usage**:

- Managing user addresses.
- Associating addresses with user profiles.

**Example Use Case**:

- Add User Address: Adding a new address for a user
- Get User Address: Retrieving all addresses associated with a user.
- Update User Address: Updating an existing address for a user.
- Delete User Address: Deleting a user address.

**Features List**:

1. **Add User Address**:
   - Endpoint `POST /user/addresses`
   - Description: Adds a new user address.
2. **Get User Addresses**:
   - Endpoint `GET /users/addresses/:userId`
   - Description: Retrieves all addresses associated with a user.
3. **Update User Address**:
   - Endpoint `PUT /users/addresses/:addressId`
   - Description: Updates an existing user address.
4. **GDelete User Address**:
   - Endpoint `DELETE /users/addresses/:addressId`
   - Description: Deletes a user address.

### Auth

**Auth** encompasses functionalities related to user authentication within the application.

**Common Elements:**:

- User Authentication: Registering, logging in, and logging out users.

**Usage**:

- Managing user authentication.
- Ensuring secure access to the application.

**Example Use Case**:

- Register User: Registering a new user.
- Login User: Logging in a user.
- Logout User: Logging out a user.

**Features List**:

1. **Register User:**
   - Endpoint `POST /users/auth/register`
   - Description: Registers a new user.
2. **Login User:**
   - Endpoint `POST /users/auth/login`
   - Description: Logs in a user.
3. **Logout User:**
   - Endpoint `PUT /users/auth/logout`
   - Description: Logs out a user.

### Profile

**Profiles** encompasses functionalities related to managing user profiles within the application.

**Common Elements:**:

- User Profiles: CRUD operations for user profile details.

**Usage**:

- Managing user authentication.
- Ensuring secure access to the application.

**Example Use Case**:

- Get User Profile: Retrieving user profile details.
- Update User Profile: Updating user profile details.
- Add Profile Picture: Adding a profile picture for a user.
- Delete Profile Picture: Deleting a profile picture for a user.

**Features List**:

1. [x] **Get User Profile:**

   - Endpoint `GET /users/profiles/:userId`
   - Description: Retrieves user profile details.

2. [x] **Update User Profile:**

   - Endpoint `PUT /users/profiles/:userId`
   - Description: Updates user profile details.

3. [x] **Add Profile Picture:**

   - Endpoint `POST /users/profiles/picture/:userId`
   - Description: Adds a profile picture for a user.

4. [ ] **Delete Profile Picture:** 
   - Endpoint `DELETE /users/profiles/picture/:userId`
   - Description: Deletes a profile picture for a user.

### UserManagement

**UserManagement** encompasses functionalities related to retrieving detailed user information within the application, including roles, permissions, activity logs, and associated data.

**Common Elements:**

- Comprehensive User Data: Detailed user information including roles, permissions, and activity logs.

**Usage:**

- Displaying a comprehensive view of the user for administrative purposes.
- Providing detailed user information for personalized user experiences.
- Managing user roles, permissions, and account statuses.

**Eample Use Case**

- Get Basic User Info: Retrieving basic user information.
- Get Detailed User Info: Retrieving detailed user information.
- Get User Info with Address: Retrieving user information along with associated addresses.
- Get User Info with Profile Picture: Retrieving user information including the profile picture.
- Get User Roles and Permissions: Retrieving the roles and permissions assigned to a user.
- Get User Activity Logs: Retrieving activity logs of a user.
- Get User Account Status: Checking the account status of a user.
- Get User Transaction History: Retrieving the transaction history associated with a user.
- Get User Notifications: Fetching notifications associated with a user.
- Update User Roles and Permissions: Updating the roles and permissions of a user.
- Update User Account Status: Updating the account status of a user.

**Features List:**

1. **Get Basic User Info:**

   - Endpoint `GET /users/userManagement/:userId`
   - Description: Retrieves basic user information.

2. **Get Detailed User Info:**
   - Endpoint `GET /users/userManagement/:userId/details`
   - Description: Retrieves detailed user information.
3. **Get User Info with Address:**

   - Endpoint `GET /users/userManagement/:userId/with-address`
   - Description: Retrieves user information along with associated addresses.

4. **Get User Info with Profile Picture:**

   - Endpoint `GET /users/userManagement/:userId/roles`
   - Description: Retrieves the roles and permissions assigned to a user.

5. **Get Basic User Info:**

   - Endpoint `GET /users/userManagement/:userId`
   - Description: Retrieves the roles and permissions assigned to a user.

6. **Get User Activity Logs:**

   - Endpoint `GET /users/userManagement/:userId/activity-logs`
   - Description: Retrieves activity logs of a user.

7. **Get User Account Status:**

   - Endpoint `GET /users/userManagement/:userId/account-status`
   - Description: Checks the account status of a user.

8. **Get User Transaction History:**

   - Endpoint `GET /users/userManagement/:userId/transactions`
   - Description: Retrieves the transaction history associated with a user.

9. **Get User Notifications:**

   - Endpoint `GET /users/userManagement/:userId/notifications`
   - Description: Fetches notifications associated with a user.

10. **Update User Roles and Permissions:**

    - Endpoint `PUT /users/userManagement/:userId/roles`
    - Description: Updates the roles and permissions of a user.

11. **Update User Account Status:**
    - Endpoint `PUT /users/userManagement/:userId/account-status`
    - Description: Updates the account status of a user.

### Possible Roles Idea

| Role              | Description                                          | Permissions                                                                                                             |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Admin**         | Full access to all aspects of the application.       | Manage users, approve/reject exchanges, manage listings, access all data, manage transactions, send notifications, etc. |
| **Moderator**     | Oversee user activity and manage content.            | Monitor activity, approve/reject listings, handle disputes, ban users, view transactions, send notifications.           |
| **Verified User** | Trusted users with additional privileges.            | List books, make/accept offers, leave reviews, view detailed transactions, access exclusive listings, report issues.    |
| **Regular User**  | General members with access to core functionalities. | Manage profile, list books, make/accept offers, view transaction history, leave reviews, receive notifications.         |
| **Guest**         | Limited access, primarily for browsing.              | Browse listings, view details, register for an account.                                                                 |
