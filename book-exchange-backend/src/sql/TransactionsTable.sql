CREATE TABLE transactions (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    offerId INT,
    status ENUM('PENDING', 'COMPLETED', 'CANCELED') DEFAULT 'PENDING',
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now() ON UPDATE now(),
    FOREIGN KEY (offerId) REFERENCES offers(offerId)
);


-- Create
INSERT INTO transactions (offerId, status)
VALUES (1, 'PENDING');

-- Read
SELECT * FROM transactions WHERE transactionId = 1;

-- Update
UPDATE transactions SET status = 'COMPLETED' WHERE transactionId = 1;

-- Delete
DELETE FROM transactions WHERE transactionId = 1;
