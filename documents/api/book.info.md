## Books

**Books** encompasses all functionalities related to managing book-related actions within the application. This includes exploring books, managing genres, handling user-specific book operations, and tracking book views. Each subfolder is dedicated to handling specific aspects of book management to ensure modularity and maintainability.

### Explore

**Features List**:

1. Get Book Listings

   - Endpoint: `GET /books/explore`
   - Description: Retrieves a list of books available for exploration.
   - Query Parameters:
     - `title`: Search for books by title.
     - `author`: Search for books by author.
     - `genres`: Filter books by genre.
     - `sort`: Sort books by criteria such as popularity, new arrivals, etc.
     - `page`: Pagination to get the desired page of results.
     - `limit`: Number of results per page.
     - `view`: Filter by views (e.g., most viewed, recently viewed).
     - Table: Books, Genres
     - When to Use: When users want to explore the collection of books available in the application.

   **Response**

   ```
   {
   "message": "Books retrieved successfully",
   "data": [
         {
            "id": 1,
            "title": "Book Title",
            "author": "Author Name",
            "genre": "Genre Name",
            "views": 100,
            "condition": "New",
            "description": "Book Description",
            "status": "PUBLIC",
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         },
         {
            "id": 2,
            "title": "Book Title",
            "author": "Author Name",
            "genre": "Genre Name",
            "views": 100,
            "condition": "New",
            "description": "Book Description",
            "status": "PUBLIC",
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         },
         ...
      ]
   }

   ```

### Genres

**Features List**:

1. **Add Genre**:

   - Endpoint: `POST /books/genres`
   - Description: Adds a new book genre.
   - Table: Genres
   - When to Use: When adding a new genre to the application.

**Response**

```
{
   "message": "Genre added successfully",
   "data": {
      "id": 1,
      "name": "Genre Name"
   }
}

```

2. **Get Genres**:

   - Endpoint: `GET /books/genres`
   - Description: Retrieves all book genres.
   - Table: Genres
   - When to Use: When displaying the list of genres in the application.

     **Response**

   ```
   {
      "message": "Genre retrieved successfully",
      "data":[ {
         "id": 1,
         "name": "Genre Name"
      }, ...]
   }

   ```

3. **Update Genre**:

   - Endpoint: `PUT /books/genres/:genreId`
   - Description: Updates an existing book genre.
   - Table: Genres
   - When to Use: When modifying the details of an existing genre.

     **Response**

   ```
   {
      "message": "Genre updated successfully",
      "data": {
         "id": 1,
         "name": "Updated Genre Name"
      }
   }

   ```

4. **Delete Genre**:

   - Endpoint: `DELETE /books/genres/:genreId`
   - Description: Deletes a book genre.
   - Table: Genres
   - When to Use: When removing a genre from the application.

     **Response**

   ```
   {
      "message": "Genre deleted successfully",
      "data": {
         "id": 1,
         "name": "Genre Name"
      }
   }

   ```

### UserBooks

**Features List**:

1. **Add User Book**:

   - Endpoint: `POST /books/userBooks`
   - Description: Adds a new book for a user.
   - Table: Books, Users
   - When to Use: When a user wants to add a book to their collection.

   **Response**

   ```
   {
      "message": "Book added successfully",
      "data": {
         "id": 1,
         "title": "Book Title",
         "author": "Author Name",
         "genre": "Genre Name",
         "views": 0,
         "condition": "New",
         "description": "Book Description",
         "status": "PUBLIC",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
      }
   }

   ```

2. **Get User Books**:

   - Endpoint: `GET /books/userBooks/:userId`
   - Description: Retrieves all books associated with a user.
   - Table: Books, Users
   - When to Use: When displaying the list of books added by a user.

   **Response**

   ```
   {
     "message": "User books retrieved successfully",
      "data": [
         {
            "id": 1,
            "title": "Book Title",
            "author": "Author Name",
            "genre": "Genre Name",
            "views": 100,
            "condition": "New",
            "description": "Book Description",
            "status": "PUBLIC",
            "createdAt": "2023-01-01T00:00:00.000Z",
            "updatedAt": "2023-01-01T00:00:00.000Z"
         },
         ...
      ]
   }

   ```

3. **Update User Book**:

   - Endpoint: `PUT /books/userBooks/:bookId`
   - Description: Updates an existing book for a user.
   - Table: Books, Users
   - When to Use: When a user wants to update the details of a book in their collection.

   **Response**

   ```
   {
      "message": "Book updated successfully",
      "data": {
         "id": 1,
         "title": "Book Title",
         "author": "Author Name",
         "genre": "Genre Name",
         "views": 0,
         "condition": "New",
         "description": "Book Description",
         "status": "PUBLIC",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
      }
   }

   ```

4. **Delete User Book**:

   - Endpoint: `DELETE /books/userBooks/:bookId`
   - Description: Deletes a user book.
   - Table: Books, Users
   - When to Use: When a user wants to remove a book from their collection.

   **Response**

   ```
   {
      "message": "Book deleted successfully",
      "data": {
         "id": 1,
         "title": "Deleted Book Title",
         "author": "Deleted Author Name",
         "genre": "Deleted Genre Name",
         "views": 150,
         "condition": "Deleted",
         "description": "Deleted Book Description",
         "status": "PRIVATE",
         "createdAt": "2023-01-01T00:00:00.000Z",
         "updatedAt": "2023-01-01T00:00:00.000Z"
      }
   }

   ```
