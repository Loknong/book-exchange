-- DropForeignKey
ALTER TABLE `AdminManagement` DROP FOREIGN KEY `AdminManagement_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `BookImages` DROP FOREIGN KEY `BookImages_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `Books` DROP FOREIGN KEY `Books_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `Notifications` DROP FOREIGN KEY `Notifications_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Offers` DROP FOREIGN KEY `Offers_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `Offers` DROP FOREIGN KEY `Offers_offeredById_fkey`;

-- DropForeignKey
ALTER TABLE `Offers` DROP FOREIGN KEY `Offers_offeredToId_fkey`;

-- DropForeignKey
ALTER TABLE `Payments` DROP FOREIGN KEY `Payments_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `Payments` DROP FOREIGN KEY `Payments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_offerId_fkey`;

-- DropForeignKey
ALTER TABLE `UserAddress` DROP FOREIGN KEY `UserAddress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserProfilePictures` DROP FOREIGN KEY `UserProfilePictures_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTransactionStatus` DROP FOREIGN KEY `UserTransactionStatus_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTransactionStatus` DROP FOREIGN KEY `UserTransactionStatus_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Books` ADD CONSTRAINT `Books_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genres`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookImages` ADD CONSTRAINT `BookImages_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offers` ADD CONSTRAINT `Offers_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Books`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offers` ADD CONSTRAINT `Offers_offeredById_fkey` FOREIGN KEY (`offeredById`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offers` ADD CONSTRAINT `Offers_offeredToId_fkey` FOREIGN KEY (`offeredToId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `Offers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payments` ADD CONSTRAINT `Payments_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTransactionStatus` ADD CONSTRAINT `UserTransactionStatus_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTransactionStatus` ADD CONSTRAINT `UserTransactionStatus_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdminManagement` ADD CONSTRAINT `AdminManagement_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfilePictures` ADD CONSTRAINT `UserProfilePictures_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
