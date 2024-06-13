
select * from books;
select * from users;
select * from genres;

SELECT * FROM books
INNER JOIN users ON users.userId = books.ownerId WHERE ownerId = 1 ;

-- User Inventory Book
SELECT 
users.userId as "userId", 
books.title as "Book Title",  
books.author as "Author",
IFNULL(books.genreId,0)  as "Genre",
books.bookCondition as "Condition",
books.description as "Description",
books.thumbnail as "Thumbnail",
books.createAt as "Created At"
FROM books
INNER JOIN users ON users.userId = books.ownerId 
INNER JOIN genres ON genres.genreId  = books.genreId 
WHERE ownerId = 1 ;

