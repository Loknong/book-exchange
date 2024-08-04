/*
  Warnings:

  - Made the column `message` on table `Notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Notifications` ADD COLUMN `link` VARCHAR(191) NULL,
    ADD COLUMN `read` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `message` VARCHAR(191) NOT NULL;
