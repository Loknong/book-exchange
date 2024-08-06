-- book_exchange.genres definition
CREATE TABLE `genres` (
    `genreId` int NOT NULL AUTO_INCREMENT,
    `genre` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`genreId`),
    UNIQUE KEY `genre` (`genre`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.users definition
CREATE TABLE `users` (
    `userId` int NOT NULL AUTO_INCREMENT,
    `firstName` varchar(255) NOT NULL,
    `lastName` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `userPassword` varchar(255) NOT NULL,
    `credit` int DEFAULT '0',
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `isLogin` tinyint(1) NOT NULL DEFAULT '0',
    `expiredDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `token` varchar(255) DEFAULT NULL,
    `userPictureId` int DEFAULT NULL,
    PRIMARY KEY (`userId`),
    UNIQUE KEY `email` (`email`),
    UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.books definition
CREATE TABLE `books` (
    `bookId` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `author` varchar(255) DEFAULT NULL,
    `genreId` int DEFAULT NULL,
    `bookView` int DEFAULT '0',
    `bookCondition` varchar(255) DEFAULT NULL,
    `description` text,
    `ownerId` int DEFAULT NULL,
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `status` enum('public', 'private') DEFAULT 'public',
    `bookImageId` int DEFAULT NULL,
    PRIMARY KEY (`bookId`),
    KEY `genreId` (`genreId`),
    KEY `books_ibfk_1` (`ownerId`),
    KEY `fk_bookImageId` (`bookImageId`),
    CONSTRAINT `books_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
    CONSTRAINT `books_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `genres` (`genreId`),
    CONSTRAINT `fk_bookImageId` FOREIGN KEY (`bookImageId`) REFERENCES `BookImages` (`imageId`)
) ENGINE = InnoDB AUTO_INCREMENT = 36 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.BookImages definition
CREATE TABLE `BookImages` (
    `imageId` int NOT NULL AUTO_INCREMENT,
    `bookId` int DEFAULT NULL,
    `imageName` varchar(255) DEFAULT NULL,
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `isActive` tinyint(1) DEFAULT '1',
    `deleted` tinyint(1) DEFAULT '0',
    PRIMARY KEY (`imageId`),
    KEY `bookId` (`bookId`),
    CONSTRAINT `bookimages_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`)
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.notifications definition
CREATE TABLE `notifications` (
    `notificationId` int NOT NULL AUTO_INCREMENT,
    `userId` int DEFAULT NULL,
    `message` text,
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`notificationId`),
    KEY `userId` (`userId`),
    CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.offers definition
CREATE TABLE `offers` (
    `offerId` int NOT NULL AUTO_INCREMENT,
    `bookId` int DEFAULT NULL,
    `offeredBy` int DEFAULT NULL,
    `offeredTo` int DEFAULT NULL,
    `status` enum('PENDING', 'ACCEPTED', 'REJECTED') DEFAULT 'PENDING',
    `offerDetails` text,
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`offerId`),
    KEY `bookId` (`bookId`),
    KEY `offeredBy` (`offeredBy`),
    KEY `offeredTo` (`offeredTo`),
    CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`),
    CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`offeredBy`) REFERENCES `users` (`userId`),
    CONSTRAINT `offers_ibfk_3` FOREIGN KEY (`offeredTo`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 158 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.transactions definition
CREATE TABLE `transactions` (
    `transactionId` int NOT NULL AUTO_INCREMENT,
    `offerId` int DEFAULT NULL,
    `status` enum('PENDING', 'CONFIRMED', 'CANCELED', 'PAYMENT_PENDING', 'PAYMENT_IN_PROGRESS', 'PAYMENT_COMPLETED', 'PAYMENT_FAILED', 'ADDRESS_SENT', 'BOOK_RECEIVED', 'SEND_BOOK_COMPLETED', 'SEND_BOOK_TO_USER', 'COMPLETED') DEFAULT 'PENDING',
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`transactionId`),
    KEY `offerId` (`offerId`),
    CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`offerId`) REFERENCES `offers` (`offerId`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


-- book_exchange.payments definition
CREATE TABLE `payments` (
    `paymentId` int NOT NULL AUTO_INCREMENT,
    `userId` int DEFAULT NULL,
    `transactionId` int DEFAULT NULL,
    `amount` decimal(10, 2) NOT NULL,
    `status` enum('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
    `evidence` text,
    `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`paymentId`),
    KEY `transactionId` (`transactionId`),
    KEY `userId` (`userId`),
    CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`),
    CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


-- book_exchange.userTransactionStatus definition
CREATE TABLE `userTransactionStatus` (
    `id` int NOT NULL AUTO_INCREMENT,
    `transactionId` int NOT NULL,
    `userId` int NOT NULL,
    `status` enum('PENDING', 'CONFIRMED', 'USER_PAYMENT_PENDING', 'WAITING_CHECK_EVIDENCE', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'RECEIVED_ADDRESS', 'SENDING_BOOK', 'SEND_BOOK_COMPLETED', 'WAITING_RECEIVED_BOOK', 'RECEIVED_BOOK') NOT NULL DEFAULT 'PENDING',
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `transactionId` (`transactionId`),
    KEY `userId` (`userId`),
    CONSTRAINT `usertransactionstatus_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`),
    CONSTRAINT `usertransactionstatus_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;



-- book_exchange.adminManagement definition
CREATE TABLE `adminManagement` (
    `managementId` int NOT NULL AUTO_INCREMENT,
    `transactionId` int NOT NULL,
    `status` enum('CHECKING_PAYMENT_EVIDENCE', 'CHECKED_PAYMENT_COMPLETED', 'SENDING_ADDRESS', 'WAITING_BOOK', 'RECEIVED_BOOK', 'SENDING_BOOK_TO_USER', 'COMPLETED') NOT NULL,
    `details` text,
    `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`managementId`),
    KEY `transactionId` (`transactionId`),
    CONSTRAINT `adminmanagement_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.Logs definition
CREATE TABLE `Logs` (
    `logId` int NOT NULL AUTO_INCREMENT,
    `section` varchar(100) NOT NULL,
    `level` varchar(50) NOT NULL,
    `message` text NOT NULL,
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`logId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.LogSettings definition
CREATE TABLE `LogSettings` (
    `settingId` int NOT NULL AUTO_INCREMENT,
    `section` varchar(100) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT '1',
    `level` varchar(50) NOT NULL DEFAULT 'DEBUG',
    PRIMARY KEY (`settingId`),
    UNIQUE KEY `section` (`section`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.statusHistory definition
CREATE TABLE `statusHistory` (
    `historyId` int NOT NULL AUTO_INCREMENT,
    `referenceTable` enum(
        'offers',
        'transactions',
        'userTransactionStatus',
        'payments',
        'adminManagement'
    ) NOT NULL,
    `referenceId` int NOT NULL,
    `status` varchar(255) NOT NULL,
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`historyId`),
    KEY `referenceId` (`referenceId`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.userAddress definition
CREATE TABLE `userAddress` (
    `addressId` int NOT NULL AUTO_INCREMENT,
    `userId` int DEFAULT NULL,
    `houseNumber` varchar(50) NOT NULL,
    `village` varchar(100) DEFAULT NULL,
    `street` varchar(100) DEFAULT NULL,
    `subdistrict` varchar(100) NOT NULL,
    `district` varchar(100) NOT NULL,
    `province` varchar(100) NOT NULL,
    `postalCode` varchar(10) NOT NULL,
    `country` varchar(50) DEFAULT 'Thailand',
    `phoneNumber` varchar(20) DEFAULT NULL,
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`addressId`),
    KEY `userId` (`userId`),
    CONSTRAINT `useraddress_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- book_exchange.userProfilePictures definition
CREATE TABLE `userProfilePictures` (
    `pictureId` int NOT NULL AUTO_INCREMENT,
    `userId` int NOT NULL,
    `pictureName` varchar(255) NOT NULL,
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `isActive` tinyint(1) DEFAULT '0',
    `deleted` tinyint(1) DEFAULT '0',
    PRIMARY KEY (`pictureId`),
    KEY `userId` (`userId`),
    CONSTRAINT `userprofilepictures_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
