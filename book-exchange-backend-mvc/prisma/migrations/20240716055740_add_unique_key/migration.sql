/*
  Warnings:

  - A unique constraint covering the columns `[uniqueKey]` on the table `TransactionDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `TransactionDetails` ADD COLUMN `uniqueKey` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `TransactionDetails_uniqueKey_key` ON `TransactionDetails`(`uniqueKey`);
