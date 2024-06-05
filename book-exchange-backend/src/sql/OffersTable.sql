CREATE TABLE offers (
    offerId INT AUTO_INCREMENT PRIMARY KEY,
    bookId INT,
    offeredBy INT,
    offeredTo INT,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED') DEFAULT 'PENDING',
    offerDetails TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (bookId) REFERENCES books(bookId),
    FOREIGN KEY (offeredBy) REFERENCES users(userId),
    FOREIGN KEY (offeredTo) REFERENCES users(userId)
);


-- Create
INSERT INTO offers (bookId, offeredBy, offeredTo, status, offerDetails)
VALUES (1, 1, 2, 'PENDING', 'Offer details here');

-- Read
SELECT * FROM offers WHERE offerId = 1;

-- Update
UPDATE offers SET status = 'ACCEPTED' WHERE offerId = 1;

-- Delete
DELETE FROM offers WHERE offerId = 1;

