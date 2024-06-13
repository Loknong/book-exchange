CREATE TABLE adminManagement (
    managementId INT AUTO_INCREMENT PRIMARY KEY,
    offerId INT,
    bookId INT,
    transactionId INT,
    adminStatus ENUM('RECEIVED', 'SENT_TO_USER', 'ISSUE') DEFAULT 'RECEIVED',
    uniqueId VARCHAR(255) NOT NULL,
    receivedAt TIMESTAMP DEFAULT now(),
    sentAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now() ON UPDATE now(),
    FOREIGN KEY (offerId) REFERENCES offers(offerId),
    FOREIGN KEY (bookId) REFERENCES books(bookId),
    FOREIGN KEY (transactionId) REFERENCES transactions(transactionId)
);

-- Create
INSERT INTO adminManagement (offerId, bookId, transactionId, adminStatus, uniqueId)
VALUES (1, 1, 1, 'RECEIVED', 'unique_admin_id');

-- Read
SELECT * FROM adminManagement WHERE managementId = 1;

-- Update
UPDATE adminManagement SET adminStatus = 'SENT_TO_USER' WHERE managementId = 1;

-- Delete
DELETE FROM adminManagement WHERE managementId = 1;
