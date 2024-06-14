-- MySQL dump 10.13  Distrib 8.2.0, for macos13 (arm64)
--
-- Host: localhost    Database: book_exchange
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminManagement`
--

DROP TABLE IF EXISTS `adminManagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminManagement` (
  `managementId` int NOT NULL AUTO_INCREMENT,
  `transactionId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `details` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`managementId`),
  KEY `transactionId` (`transactionId`),
  CONSTRAINT `adminmanagement_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminManagement`
--

LOCK TABLES `adminManagement` WRITE;
/*!40000 ALTER TABLE `adminManagement` DISABLE KEYS */;
/*!40000 ALTER TABLE `adminManagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BookImages`
--

DROP TABLE IF EXISTS `BookImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BookImages` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `bookId` int DEFAULT NULL,
  `imageName` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint(1) DEFAULT '1',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`imageId`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `bookimages_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `Books` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BookImages`
--

LOCK TABLES `BookImages` WRITE;
/*!40000 ALTER TABLE `BookImages` DISABLE KEYS */;
INSERT INTO `BookImages` VALUES (1,9,'e4610a43-b3b9-4f79-a01d-8db2e1ddf801.jpg','2024-06-09 18:33:22',1,0),(2,10,'af4ff07f-4fda-4911-8d61-1240124ba3ed.jpg','2024-06-09 18:40:42',1,0),(3,11,'b3dbdc71-6feb-4612-b76e-7019c74a70ab.jpg','2024-06-11 11:58:49',1,0),(4,12,'c77b027f-a0d1-48b8-9dd0-4c1ff70a9569.jpg','2024-06-11 11:59:06',1,0),(5,13,'290ca750-459a-4d95-b096-498244e51c54.jpg','2024-06-11 11:59:20',1,0),(6,14,'cf9f9da8-6bca-476e-a530-850d5a5226c2.jpg','2024-06-11 11:59:32',1,0),(7,15,'5433aad8-36ea-473f-9fd9-22ce8ad2baf0.jpg','2024-06-11 11:59:49',1,0),(8,16,'44f26e14-476b-4ace-a5f8-9ea9c483e306.jpg','2024-06-11 12:00:01',1,0),(9,17,'183a6142-1002-4f6e-98ca-3d18ef9917c2.jpg','2024-06-11 12:00:20',1,0),(10,18,'b8df996d-d61a-4b5a-b127-e4cb22ac3481.jpg','2024-06-11 12:00:31',1,0),(11,19,'d5905994-eb6b-4ce2-8573-597ed2434220.jpg','2024-06-11 12:00:43',1,0),(12,20,'8610f3ad-7080-4fe1-81ca-337594fe92b6.jpg','2024-06-11 12:00:57',1,0),(13,21,'22f86628-8614-49ae-a8e0-ae3f2af074c1.jpg','2024-06-11 12:01:09',1,0),(14,22,'09dec342-b616-4b11-8be4-e0c53b5dd17f.jpg','2024-06-11 12:01:44',1,0),(15,23,'f6a0828f-af10-4dc2-9e5c-f905368199a8.jpg','2024-06-11 12:01:59',1,0),(16,24,'7612288d-de43-490b-8880-d605d5693106.jpg','2024-06-11 12:02:09',1,0),(17,25,'1563a3df-47aa-488b-a799-23f98c952941.jpg','2024-06-11 12:02:26',1,0),(18,26,'f1787d1b-ab67-45a2-a6d8-0eea749cd065.jpg','2024-06-11 12:02:38',1,0),(19,27,'e433e192-17b5-4fc9-86d9-da765d00c61d.jpg','2024-06-11 12:02:51',1,0),(20,28,'095a4714-86b0-4ede-b952-aef505137c37.jpg','2024-06-11 12:03:04',1,0),(21,29,'aeb5e55f-d006-46a9-ad13-5b37ac8ecbe7.jpg','2024-06-11 12:03:16',1,0),(22,30,'226afae0-560b-4c2d-b98c-77535e7317d7.jpg','2024-06-11 12:03:28',1,0),(23,31,'d50ca02a-f264-4df0-98b4-306495f6e5d6.jpg','2024-06-11 12:03:29',1,0),(24,33,'995a6fef-4f44-4e31-bad9-f5c1ad554992.jpg','2024-06-11 12:03:49',1,0),(25,34,'15a00a18-9110-42d9-b1fc-010ce728bf6e.jpg','2024-06-11 12:03:58',1,0),(26,35,'f1a865f8-4077-40aa-8707-a2a481ee99f7.jpg','2024-06-11 12:04:07',1,0);
/*!40000 ALTER TABLE `BookImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  `status` enum('public','private') DEFAULT 'public',
  `bookImageId` int DEFAULT NULL,
  PRIMARY KEY (`bookId`),
  KEY `genreId` (`genreId`),
  KEY `books_ibfk_1` (`ownerId`),
  KEY `fk_bookImageId` (`bookImageId`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `genres` (`genreId`),
  CONSTRAINT `fk_bookImageId` FOREIGN KEY (`bookImageId`) REFERENCES `BookImages` (`imageId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (9,'I\'m a new book','Some one',1,0,'','',1,'2024-06-09 18:33:22','2024-06-09 18:33:22','public',NULL),(10,'I\'m a new book','Some one',1,0,'','',1,'2024-06-09 18:40:42','2024-06-09 18:40:42','public',NULL),(11,'I\'m a new book 2','Some one',1,0,'','',1,'2024-06-11 11:58:49','2024-06-11 11:58:49','public',NULL),(12,'I\'m a new book 3','Some one',1,0,'','',1,'2024-06-11 11:59:06','2024-06-11 11:59:06','public',NULL),(13,'I\'m a new book 4','Some one',5,0,'','',1,'2024-06-11 11:59:20','2024-06-11 11:59:20','public',NULL),(14,'I\'m a new book 5','Some one',5,0,'','',1,'2024-06-11 11:59:32','2024-06-11 11:59:32','public',NULL),(15,'I\'m a new book 6','Some one',5,0,'','',5,'2024-06-11 11:59:49','2024-06-11 11:59:49','public',NULL),(16,'I\'m a new book 7','Some one',5,0,'','',5,'2024-06-11 12:00:01','2024-06-11 12:00:01','public',NULL),(17,'I\'m a new book 8','Some one',5,0,'','',6,'2024-06-11 12:00:20','2024-06-11 12:00:20','public',NULL),(18,'I\'m a new book 9','Some one',5,0,'','',6,'2024-06-11 12:00:31','2024-06-11 12:00:31','public',NULL),(19,'I\'m a new book 10','Some one',5,0,'','',6,'2024-06-11 12:00:43','2024-06-11 12:00:43','public',NULL),(20,'I\'m a new book 11','Some one',5,0,'','',7,'2024-06-11 12:00:57','2024-06-11 12:00:57','public',NULL),(21,'I\'m a new book 12','Some one',5,0,'','',7,'2024-06-11 12:01:09','2024-06-11 12:01:09','public',NULL),(22,'I\'m a new book 13','Some one',3,0,'','',8,'2024-06-11 12:01:44','2024-06-11 12:01:44','public',NULL),(23,'I\'m a new book 14','Some one',3,0,'','',9,'2024-06-11 12:01:59','2024-06-11 12:01:59','public',NULL),(24,'I\'m a new book 15','Some one',3,0,'','',9,'2024-06-11 12:02:09','2024-06-11 12:02:09','public',NULL),(25,'I\'m a new book 16','Some one',3,0,'','',10,'2024-06-11 12:02:26','2024-06-11 12:02:26','public',NULL),(26,'I\'m a new book 17','Some one',3,0,'','',11,'2024-06-11 12:02:38','2024-06-11 12:02:38','public',NULL),(27,'I\'m a new book 18','Some one',3,0,'','',12,'2024-06-11 12:02:51','2024-06-11 12:02:51','public',NULL),(28,'I\'m a new book 19','Some one',3,0,'','',13,'2024-06-11 12:03:04','2024-06-11 12:03:04','public',NULL),(29,'I\'m a new book 20','Some one',3,0,'','',14,'2024-06-11 12:03:16','2024-06-11 12:03:16','public',NULL),(30,'I\'m a new book 21','Some one',3,0,'','',15,'2024-06-11 12:03:28','2024-06-11 12:03:28','public',NULL),(31,'I\'m a new book 21','Some one',3,0,'','',15,'2024-06-11 12:03:29','2024-06-11 12:03:29','public',NULL),(33,'I\'m a new book 22','Some one',3,0,'','',11,'2024-06-11 12:03:49','2024-06-11 12:03:49','public',NULL),(34,'I\'m a new book 23','Some one',3,0,'','',13,'2024-06-11 12:03:58','2024-06-11 12:03:58','public',NULL),(35,'I\'m a new book 24','Some one',3,0,'','',14,'2024-06-11 12:04:07','2024-06-11 12:04:07','public',NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `genreId` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`genreId`),
  UNIQUE KEY `genre` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (2,'Fiction'),(1,'Game'),(4,'Math'),(3,'Novel'),(5,'Other');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logs`
--

DROP TABLE IF EXISTS `Logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logs` (
  `logId` int NOT NULL AUTO_INCREMENT,
  `section` varchar(100) NOT NULL,
  `level` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`logId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logs`
--

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `Logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LogSettings`
--

DROP TABLE IF EXISTS `LogSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LogSettings` (
  `settingId` int NOT NULL AUTO_INCREMENT,
  `section` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `level` varchar(50) NOT NULL DEFAULT 'DEBUG',
  PRIMARY KEY (`settingId`),
  UNIQUE KEY `section` (`section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LogSettings`
--

LOCK TABLES `LogSettings` WRITE;
/*!40000 ALTER TABLE `LogSettings` DISABLE KEYS */;
/*!40000 ALTER TABLE `LogSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notificationId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `message` text,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notificationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers` (
  `offerId` int NOT NULL AUTO_INCREMENT,
  `bookId` int DEFAULT NULL,
  `offeredBy` int DEFAULT NULL,
  `offeredTo` int DEFAULT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED') DEFAULT 'PENDING',
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
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (3,9,1,5,'ACCEPTED','ASDASD','2024-06-11 06:57:25','2024-06-11 13:24:46'),(4,11,5,6,'PENDING','Would you like to exchange?','2024-06-11 12:45:02','2024-06-11 12:45:02'),(125,10,9,11,'PENDING','Would you like to exchange \"The Great Gatsby\"?','2024-06-11 12:55:47','2024-06-11 12:55:47'),(126,15,12,13,'PENDING','Interested in trading \"To Kill a Mockingbird\"?','2024-06-11 12:56:01','2024-06-11 12:56:01'),(127,22,6,8,'PENDING','How about swapping \"1984\" for one of yours?','2024-06-11 12:56:10','2024-06-11 12:56:10'),(128,27,7,5,'PENDING','Let\'s exchange \"Moby Dick\".','2024-06-11 12:56:34','2024-06-11 12:56:34'),(129,30,10,12,'PENDING','Would you like to exchange \"Pride and Prejudice\"?','2024-06-11 12:56:49','2024-06-11 12:56:49'),(130,18,11,14,'PENDING','Are you interested in exchanging \"The Catcher in the Rye\"?','2024-06-11 12:56:59','2024-06-11 12:56:59'),(131,25,8,7,'PENDING','I have \"The Hobbit\", want to trade?','2024-06-11 12:57:08','2024-06-11 12:57:08'),(132,31,13,9,'PENDING','Would you be interested in \"War and Peace\"?','2024-06-11 12:57:16','2024-06-11 12:57:16'),(133,33,15,10,'PENDING','How about we exchange \"Anna Karenina\"?','2024-06-11 12:57:21','2024-06-11 12:57:21'),(134,35,12,11,'PENDING','Would you like to exchange \"Crime and Punishment\"?','2024-06-11 12:57:27','2024-06-11 12:57:27'),(135,14,9,13,'PENDING','I have \"Brave New World\", would you like to exchange?','2024-06-11 12:57:33','2024-06-11 12:57:33'),(136,21,14,15,'PENDING','Want to trade \"The Odyssey\"?','2024-06-11 12:57:38','2024-06-11 12:57:38'),(137,24,10,6,'PENDING','How about we swap \"Great Expectations\"?','2024-06-11 12:57:43','2024-06-11 12:57:43'),(138,29,7,8,'PENDING','Would you like to exchange \"The Iliad\"?','2024-06-11 12:57:48','2024-06-11 12:57:48'),(139,11,5,12,'PENDING','Interested in trading \"Don Quixote\"?','2024-06-11 12:57:52','2024-06-11 12:57:52'),(140,16,11,9,'PENDING','Would you like to exchange \"The Divine Comedy\"?','2024-06-11 12:57:57','2024-06-11 12:57:57'),(141,23,13,14,'PENDING','I have \"Les Misérables\", want to exchange?','2024-06-11 12:58:01','2024-06-11 12:58:01'),(142,28,6,5,'PENDING','How about swapping \"Jane Eyre\"?','2024-06-11 12:58:05','2024-06-11 12:58:05'),(143,19,15,8,'PENDING','Would you like to trade \"Wuthering Heights\"?','2024-06-11 12:58:09','2024-06-11 12:58:09'),(147,11,5,6,'PENDING','Would you like to exchange?','2024-06-11 13:01:12','2024-06-11 13:01:12'),(148,11,11,6,'PENDING','Would you like to exchange?','2024-06-11 19:53:34','2024-06-11 19:53:34'),(149,11,12,6,'PENDING','Would you like to exchange?','2024-06-11 19:56:57','2024-06-11 19:56:57'),(150,11,13,6,'PENDING','Would you like to exchange?','2024-06-11 19:59:38','2024-06-11 19:59:38'),(151,11,14,6,'PENDING','Would you like to exchange?','2024-06-11 20:00:03','2024-06-11 20:00:03'),(152,11,1,6,'PENDING','Would you like to exchange?','2024-06-11 20:00:25','2024-06-11 20:00:25'),(153,12,5,6,'PENDING','Would you like to exchange?','2024-06-11 20:01:05','2024-06-11 20:01:05'),(154,14,5,6,'PENDING','Would you like to exchange?','2024-06-12 09:16:04','2024-06-12 09:16:04'),(155,15,5,6,'PENDING','Would you like to exchange?','2024-06-12 09:42:23','2024-06-12 09:42:23'),(156,16,5,6,'PENDING','Would you like to exchange?','2024-06-12 09:43:04','2024-06-12 09:43:04'),(157,17,5,6,'PENDING','Would you like to exchange?','2024-06-12 09:43:54','2024-06-12 09:43:54');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `transactionId` int DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('PENDING','COMPLETED','FAILED') DEFAULT 'PENDING',
  `evidence` text,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`paymentId`),
  KEY `transactionId` (`transactionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusHistory`
--

DROP TABLE IF EXISTS `statusHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statusHistory` (
  `historyId` int NOT NULL AUTO_INCREMENT,
  `referenceTable` enum('offers','transactions','userTransactionStatus','payments','adminManagement') NOT NULL,
  `referenceId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`historyId`),
  KEY `referenceId` (`referenceId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusHistory`
--

LOCK TABLES `statusHistory` WRITE;
/*!40000 ALTER TABLE `statusHistory` DISABLE KEYS */;
INSERT INTO `statusHistory` VALUES (4,'offers',157,'PENDING','2024-06-12 09:43:54');
/*!40000 ALTER TABLE `statusHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionId` int NOT NULL AUTO_INCREMENT,
  `offerId` int DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'PENDING',
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`transactionId`),
  KEY `offerId` (`offerId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`offerId`) REFERENCES `offers` (`offerId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,4,'CONFIRMED','2024-06-13 15:41:35','2024-06-13 15:45:05');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userAddress`
--

DROP TABLE IF EXISTS `userAddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `useraddress_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userAddress`
--

LOCK TABLES `userAddress` WRITE;
/*!40000 ALTER TABLE `userAddress` DISABLE KEYS */;
/*!40000 ALTER TABLE `userAddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userProfilePictures`
--

DROP TABLE IF EXISTS `userProfilePictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userProfilePictures`
--

LOCK TABLES `userProfilePictures` WRITE;
/*!40000 ALTER TABLE `userProfilePictures` DISABLE KEYS */;
INSERT INTO `userProfilePictures` VALUES (1,5,'c043469a-1d5a-412e-8b5a-e10f07540db4.jpg','2024-06-09 15:53:10',1,0),(2,5,'9d999ae8-17b7-4431-9feb-8c99fc592d4a.jpg','2024-06-09 17:09:36',1,0),(3,5,'9efbe3d4-e642-46ba-b603-a98abc592b8e.jpg','2024-06-09 17:09:55',1,0),(5,6,'1ef7d8f3-2631-4dc5-bf20-386e47dcff31.jpg','2024-06-11 11:05:58',1,0),(6,7,'89d93c8c-5a08-4edd-903d-5124cfc54dab.jpg','2024-06-11 11:25:06',1,0),(7,8,'ae8ec491-32e3-4cb6-a1b6-eaf4bd44bb6d.jpg','2024-06-11 11:25:56',1,0),(8,9,'7189d2d3-ec34-4fd5-a0ca-e01ca5a39203.jpg','2024-06-11 11:26:57',1,0),(9,10,'865aeb6e-ca7c-4705-b820-fffdd5d4a028.jpg','2024-06-11 11:27:34',1,0),(10,11,'c54b31fd-2d34-4920-a345-d1dfc2e222ad.jpg','2024-06-11 11:28:14',1,0),(11,12,'b4f649f1-7b98-4931-b8f8-4dd850b9d4c7.jpg','2024-06-11 11:29:01',1,0),(12,13,'c5680a8e-4610-45c0-a08c-9970422910d4.jpg','2024-06-11 11:29:37',1,0),(13,14,'2dd92825-4ac8-4683-a531-c02c58b37a22.jpg','2024-06-11 11:30:17',1,0),(14,15,'06282a79-7043-4fcd-b36b-30616c349a67.jpg','2024-06-11 11:30:56',1,0);
/*!40000 ALTER TABLE `userProfilePictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jukkapan','Kongjun','jukkapan1234@example.com','jukkapan1234','newpassword123',0,'2024-06-09 14:26:47','2024-06-09 14:28:02',0,'2024-06-09 14:26:47',NULL,NULL),(5,'John','Kongjun2','jukkapan2.1234@example.com','aabbaacc','password',0,'2024-06-09 15:53:10','2024-06-09 17:09:55',0,'2024-06-09 15:53:10',NULL,3),(6,'Jukkapan3','Kongjun3','jukkapan3.1234@example.com','aabbaaccss','password',0,'2024-06-11 11:05:58','2024-06-11 11:05:58',0,'2024-06-11 11:05:58',NULL,5),(7,'Jane','Smith','jane.smith@example.com','jane_smith','password456',0,'2024-06-11 11:25:06','2024-06-11 11:25:06',0,'2024-06-11 11:25:06',NULL,6),(8,'Michael','Johnson','michael.johnson@example.com','mike_j','password456',0,'2024-06-11 11:25:56','2024-06-11 11:25:56',0,'2024-06-11 11:25:56',NULL,7),(9,'Emily','Davis','emily.davis@example.com','emily_d','password456',0,'2024-06-11 11:26:57','2024-06-11 11:26:57',0,'2024-06-11 11:26:57',NULL,8),(10,'David','Brown','david.brown@example.com','dave_b','password654',0,'2024-06-11 11:27:34','2024-06-11 11:27:34',0,'2024-06-11 11:27:34',NULL,9),(11,'Sarah','Wilson','sarah.wilson@example.com','sarah_w','password987',0,'2024-06-11 11:28:14','2024-06-11 11:28:14',0,'2024-06-11 11:28:14',NULL,10),(12,'Daniel','Martinez','daniel.martinez@example.com','dan_m','password1234',0,'2024-06-11 11:29:01','2024-06-11 11:29:01',0,'2024-06-11 11:29:01',NULL,11),(13,'Laura','Anderson','laura.anderson@example.com','laura_a','password1234',0,'2024-06-11 11:29:37','2024-06-11 11:29:37',0,'2024-06-11 11:29:37',NULL,12),(14,'Robert','Thomas','robert.thomas@example.com','rob_t','password91011',0,'2024-06-11 11:30:17','2024-06-11 11:30:17',0,'2024-06-11 11:30:17',NULL,13),(15,'Olivia','Jackson','olivia.jackson@example.com','olivia_j','password1213',0,'2024-06-11 11:30:56','2024-06-11 11:30:56',0,'2024-06-11 11:30:56',NULL,14);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userTransactionStatus`
--

DROP TABLE IF EXISTS `userTransactionStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userTransactionStatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionId` int NOT NULL,
  `userId` int NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'PENDING',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `transactionId` (`transactionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `usertransactionstatus_ibfk_1` FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`transactionId`),
  CONSTRAINT `usertransactionstatus_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userTransactionStatus`
--

LOCK TABLES `userTransactionStatus` WRITE;
/*!40000 ALTER TABLE `userTransactionStatus` DISABLE KEYS */;
INSERT INTO `userTransactionStatus` VALUES (1,1,5,'CANCELED','2024-06-13 17:42:07','2024-06-13 17:47:06'),(2,1,6,'CONFIRMED','2024-06-13 18:19:16',NULL);
/*!40000 ALTER TABLE `userTransactionStatus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14 19:52:06
