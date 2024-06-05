CREATE TABLE sessions (
    sessionId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    token VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT now(),
    expiresAt TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Create
INSERT INTO sessions (userId, token, expiresAt)
VALUES (1, 'session_token', DATE_ADD(NOW(), INTERVAL 1 HOUR));

-- Read
SELECT * FROM sessions WHERE sessionId = 1;

-- Update
UPDATE sessions SET expiresAt = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE sessionId = 1;

-- Delete
DELETE FROM sessions WHERE sessionId = 1;
