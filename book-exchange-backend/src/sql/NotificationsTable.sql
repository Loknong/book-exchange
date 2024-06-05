CREATE TABLE notifications (
    notificationId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    message TEXT,
    createdAt TIMESTAMP DEFAULT now(),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Create
INSERT INTO notifications (userId, message)
VALUES (1, 'Notification message here');

-- Read
SELECT * FROM notifications WHERE notificationId = 1;

