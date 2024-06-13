CREATE TABLE books (
    bookId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    genre VARCHAR(255),
    bookView INT DEFAULT 0,
    bookCondition VARCHAR(255),
    description TEXT,
    ownerId INT,
    uniqueId VARCHAR(255) UNIQUE NOT NULL,
    thumbnail VARCHAR(255),
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now() ON UPDATE now(),
    FOREIGN KEY (ownerId) REFERENCES users(userId)
);


-- Create
INSERT INTO books (title, author, genre, bookView, bookCondition, description, ownerId, uniqueId, thumbnail)
VALUES ('Book Title', 'Author Name', 'Genre', 0, 'New', 'Description of the book', 1, 'unique_book_id', 'thumbnail_url');

-- Read
SELECT * FROM books WHERE bookId = 1;

-- Update
UPDATE books SET title = 'New Book Title', author = 'New Author Name' WHERE bookId = 1;

-- Delete
DELETE FROM books WHERE bookId = 1;
