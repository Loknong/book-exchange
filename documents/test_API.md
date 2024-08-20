### Setup

1. Mocking Data

   - **API:** `POST /api/database/setup`

### Authentication

1. Register User

   - **API:** `POST /api/users/auth/register`
   - **Request:**

     ```json
     {
       "firstName": "Test3",
       "lastName": "Test3",
       "email": "Test3@test.com",
       "username": "test1",
       "password": "test1",
       "thumbnail": "File upload (image thumbnail)"
     }
     ```

   - **Expected Success Response:**

     ```json
     {
       "response": {
         "status": "success",
         "message": "User registered successfully",
         "data": {
           "id": 12,
           "firstName": "Test3",
           "lastName": "Test3",
           "email": "Test3@test.com",
           "username": "test1"
         }
       }
     }
     ```

   - **Expected Error Response:**

     ```json
     {
       "response": {
         "status": "error",
         "message": "Unexpected error occurred",
         "data": {}
       }
     }
     ```

2. Login

   - **API:** `POST /api/users/auth/login`
   - **Request:**

     ```json
     {
       "username": "test1",
       "password": "test1"
     }
     ```

   - **Expected Success Response:**

     ```json
     {
       "response": {
         "status": "success",
         "message": "User logged in successfully",
         "data": {
           "user": {
             "id": 12,
             "firstName": "Test3",
             "lastName": "Test3",
             "email": "Test3@test.com",
             "username": "test1",
             "credit": 0,
             "isLoggedIn": true
           },
           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwicm9sZSI6IlVTRVIifSwiaWF0IjoxNzIyODgzNzI5LCJleHAiOjE3MjI4ODczMjl9.JM6z7aLKYGsUMHv_a46gMpVAMzmTZlYbVXpMW6aT4pM"
         }
       }
     }
     ```

   - **Expected Error Response:**

     ```json
     {
       "response": {
         "status": "error",
         "message": "Failed to login. Please check your username and password."
       }
     }
     ```

### User Information

1. User Address
 - Create
   - **Header:** Authorization: Bearer Token
   - **API:** `POST /api/users/address/`
   - **Request:**

     ```json
     {
       "userId": 1,
       "houseNumber": "123/45",
       "village": "Moo 5",
       "street": "Sukhumvit Road",
       "subdistrict": "Bang Na",
       "district": "Bang Na",
       "province": "Bangkok",
       "postalCode": "10260",
       "country": "Thailand",
       "phoneNumber": "0812345678"
     }
     ```

   - **Expected Success Response:**

     ```json
     {
       "response": {
         "status": "success",
         "message": "Address added successfully",
         "data": {
           "id": 1,
           "userId": 1,
           "houseNumber": "123/45",
           "village": "Moo 5",
           "street": "Sukhumvit Road",
           "subdistrict": "Bang Na",
           "district": "Bang Na",
           "province": "Bangkok",
           "postalCode": "10260",
           "country": "Thailand",
           "phoneNumber": "0812345678"
         }
       }
     }
     ```

   - **Expected Error Response:**

     ```json
     {
       "response": {
         "status": "error",
         "message": "Unauthorized: No token provided"
       }
     }
     ```
 - Get Address


 Expected Error Response 
 No Token
 {
    "message": "Unauthorized: No token provided"
}
Tokem but ..
{
    "error": "\"user\" is not allowed"
}
### Books

1. User Book

   - **Header:** Authorization: Bearer Token
   - **API:** `GET /api/books/user/:id`

   - **Expected Success Response:**

     ```json
     {
       "response": {
         "status": "success",
         "message": "Books fetched successfully",
         "data": []
       }
     }
     ```

   - **Expected Error Response:**

     ```json
     {
       "response": {
         "status": "error",
         "message": "Unauthorized",
         "error": "You are not authorized to view this resource."
       }
     }
     ```

### Create Offer

1. Create Offer

   - **API:** `POST /api/offers/create`
   - **Header:** Authorization: Bearer Token
   - **Request:**

     ```json
     {
       "userId": 12,
       "bookId": 5,
       "price": 200,
       "condition": "Like new"
     }
     ```

   - **Expected Success Response:**

     ```json
     {
       "response": {
         "status": "success",
         "message": "Offer created successfully",
         "data": {
           "offerId": 1,
           "userId": 12,
           "bookId": 5,
           "price": 200,
           "condition": "Like new",
           "status": "active"
         }
       }
     }
     ```

   - **Expected Error Response:**

     ```json
     {
       "response": {
         "status": "error",
         "message": "Failed to create offer",
         "data": {}
       }
     }
     ```
