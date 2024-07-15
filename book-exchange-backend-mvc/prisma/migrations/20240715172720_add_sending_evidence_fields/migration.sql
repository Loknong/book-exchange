-- AlterTable
ALTER TABLE `TransactionDetails` ADD COLUMN `adminSendingEvidenceToOfferedBy` VARCHAR(191) NULL,
    ADD COLUMN `adminSendingEvidenceToOfferedTo` VARCHAR(191) NULL,
    ADD COLUMN `offeredBySendingEvidence` VARCHAR(191) NULL,
    ADD COLUMN `offeredToSendingEvidence` VARCHAR(191) NULL;
