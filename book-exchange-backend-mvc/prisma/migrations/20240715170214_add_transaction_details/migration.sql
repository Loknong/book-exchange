-- CreateTable
CREATE TABLE `TransactionDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `offeredByAddress` VARCHAR(191) NOT NULL,
    `offeredToAddress` VARCHAR(191) NOT NULL,
    `offeredByCode` VARCHAR(191) NOT NULL,
    `offeredToCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionDetails` ADD CONSTRAINT `TransactionDetails_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
