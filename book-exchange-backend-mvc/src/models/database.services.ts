import { PrismaTransactionClient } from "@src/types/utils/primaAlias.types";

export const resetDatabase = async (
  transactionPrisma: PrismaTransactionClient
): Promise<void> => {
  // Disable foreign key checks
  await transactionPrisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0`;

  // Delete all data
  await transactionPrisma.$executeRaw`DELETE FROM \`Books\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`Genres\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`Users\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`UserProfilePictures\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`Notifications\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`Offers\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`Transactions\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`Payments\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`UserTransactionStatus\``;
  await transactionPrisma.$executeRaw`DELETE FROM \`AdminManagement\``;

  // Reset auto-increment counters
  await transactionPrisma.$executeRaw`ALTER TABLE \`Books\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`Genres\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`Users\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`UserProfilePictures\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`Notifications\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`Offers\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`Transactions\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`Payments\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`UserTransactionStatus\` AUTO_INCREMENT = 1`;
  await transactionPrisma.$executeRaw`ALTER TABLE \`AdminManagement\` AUTO_INCREMENT = 1`;

  // Re-enable foreign key checks
  await transactionPrisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1`;
};

