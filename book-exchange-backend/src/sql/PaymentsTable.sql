CREATE TABLE payments (
    paymentId INT AUTO_INCREMENT PRIMARY KEY,
    transactionId INT,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
    evidence TEXT,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now() ON UPDATE now(),
    FOREIGN KEY (transactionId) REFERENCES transactions(transactionId)
);

-- Create
INSERT INTO payments (transactionId, amount, status, evidence)
VALUES (1, 100.00, 'PENDING', 'Payment evidence details');

-- Read
SELECT * FROM payments WHERE paymentId = 1;

-- Update
UPDATE payments SET status = 'COMPLETED' WHERE paymentId = 1;

-- Delete
DELETE FROM payments WHERE paymentId = 1;
