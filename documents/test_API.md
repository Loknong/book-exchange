### Setup

1. Mocking Data
   - API: `POST /api/database/setup`

### Authentication

1. Register User

   - API: `POST /api/users/auth/register`
   - Request:

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

   - Expected Success Response:

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

   - Expected Error Response:
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

   - API: `POST /api/users/auth/login`
   - Request:

     ```json
     {
       "username": "test1",
       "password": "test1"
     }
     ```

   - Expected Success Response:

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

   - Expected Error Response:

     ```json
     {
       "error": "Failed to login. Please check your username and password."
     }
     ```

3. User data
    