## Books

**Books** encompasses all functionalities related to managing book-related actions within the application. This includes exploring books, managing genres, handling user-specific book operations, and tracking book views. Each subfolder is dedicated to handling specific aspects of book management to ensure modularity and maintainability.

### Explore

**Features List**:

1. Create Log Entry

   - Endpoint: `POST /logs`
   - Description: Adds a new log entry.

   **Body**

   ```
    {
        "section": "books",
        "level": "INFO",
        "message": "Book created successfully.",
        "userId": 123
    }

   ```

   **Response**

   ```
   {
    "id": 1,
    "section": "books",
    "level": "INFO",
    "message": "Book created successfully.",
    "createdAt": "2023-07-07T10:00:00.000Z",
    "userId": 123
   }

   ```
