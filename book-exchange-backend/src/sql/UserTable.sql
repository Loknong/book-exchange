CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    credit INT DEFAULT 0,
    resetToken VARCHAR(255),
    tokenExpiration TIMESTAMP,
    createdAt TIMESTAMP DEFAULT now(),
    updatedAt TIMESTAMP DEFAULT now() ON UPDATE now()
);

-- Create
INSERT INTO Users (firstName, lastName, email, username, userPassword, credit, resetToken, tokenExpiration)
VALUES ('John', 'Doe', 'john.doe@example.com', 'johndoe', 'hashed_password', 0, NULL, NULL);

-- Read
SELECT * FROM users WHERE userId = 1;

-- Update
UPDATE users SET firstName = 'Jane', lastName = 'Doe', email = 'jane.doe@example.com' WHERE userId = 1;

-- Delete
DELETE FROM users WHERE userId = 1;
