import { Prisma } from "@prisma/client";
import crypto from "crypto";
import QRCode from "qrcode";

// Define the interface for the expected return type
export interface CheckBookQR {
  userId: number;
  transactionId: number;
  bookId: number;
  isOwner: boolean;
  uniqueKey: string;
}

// Function to generate a complex code
export const generateComplexCode = (
  userId: number,
  transactionId: number,
  bookId: number
): string => {
  const randomString = crypto.randomBytes(8).toString("hex");
  const base64UserId = Buffer.from(userId.toString()).toString("base64");
  const base64TransactionId = Buffer.from(transactionId.toString()).toString(
    "base64"
  );
  const base64BookId = Buffer.from(bookId.toString()).toString("base64");
  const uniqueKey = crypto.randomBytes(16).toString("hex");

  return `${randomString}-${base64UserId}-${base64TransactionId}-${base64BookId}-${uniqueKey}`;
};

// Function to create QR code from a complex code
export const createQRCode = async (code: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(code);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
};

// Function to handle QR code scanning
export const scanQRCode = async (
  qrCode: string,
  transactionUniqueKey: string,
  userId: number,
  prismaTransaction: Prisma.TransactionClient
): Promise<CheckBookQR> => {
  const transformedData = await codeToObject(
    qrCode,
    transactionUniqueKey,
    userId,
    prismaTransaction
  );
  return transformedData;
};

// Function to handle raw code input
export const processRawCode = async (
  rawCode: string,
  transactionUniqueKey: string,
  userId: number,
  prismaTransaction: Prisma.TransactionClient
): Promise<CheckBookQR> => {
  const transformedData = await codeToObject(
    rawCode,
    transactionUniqueKey,
    userId,
    prismaTransaction
  );
  return transformedData;
};

// Function to transform code (QR or raw) into CheckBookQR format and verify unique key
const codeToObject = async (
  code: string,
  transactionUniqueKey: string,
  userId: number,
  prismaTransaction: Prisma.TransactionClient
): Promise<CheckBookQR> => {
  const [
    randomString,
    base64UserId,
    base64TransactionId,
    base64BookId,
    uniqueKey,
  ] = code.split("-");
  if (uniqueKey !== transactionUniqueKey) {
    throw new Error("Invalid code: unique key mismatch.");
  }
  const codeUserId = parseInt(
    Buffer.from(base64UserId, "base64").toString("utf8"),
    10
  );
  const transactionId = parseInt(
    Buffer.from(base64TransactionId, "base64").toString("utf8"),
    10
  );
  const bookId = parseInt(
    Buffer.from(base64BookId, "base64").toString("utf8"),
    10
  );

  // Check if the user is the owner
  // const transactionDetail = await prismaTransaction.transactionDetail.findFirst(
  //   {
  //     where: {
  //       userId: codeUserId,
  //       transactionId: transactionId,
  //       bookId: bookId,
  //       uniqueKey: uniqueKey,
  //     },
  //   }
  // );

  // if (!transactionDetail) {
  //   throw new Error("Transaction detail not found or user is not the owner.");
  // }

  return {
    userId: codeUserId,
    transactionId: transactionId,
    bookId: bookId,
    isOwner: userId === codeUserId,
    uniqueKey: uniqueKey,
  };
};

// Function to check book process
export const receivedBookProcess = async (
  code: string,
  transactionUniqueKey: string,
  userId: number,
  prismaTransaction: Prisma.TransactionClient
) => {
  // Transform the code into an object
  const bookDetails = await codeToObject(
    code,
    transactionUniqueKey,
    userId,
    prismaTransaction
  );

  if (!bookDetails) throw new Error("This code or book is not in transaction.");
  // Perform any updates or manipulations needed
  // For demonstration, let's just log the details
  console.log("Book Details:", bookDetails);

  // Return the book details
  return bookDetails;
};

// Example usage
// (async () => {
//   // Generate a complex code
//   const complexCode = generateComplexCode(1, 1234, 5678);
//   console.log("Generated Complex Code:", complexCode);

//   // Create a QR code from the complex code
//   const qrCode = await createQRCode(complexCode);
//   console.log("Generated QR Code Data URL:", qrCode);

//   // Insert the transaction detail into the database
//   const newTransactionDetail = await prismaTransaction.transactionDetail.create(
//     {
//       data: {
//         userId: 1,
//         transactionId: 1234,
//         bookId: 5678,
//         uniqueKey: complexCode.split("-").pop()!,
//       },
//     }
//   );
//   console.log("Inserted Transaction Detail:", newTransactionDetail);

//   // Simulate scanning the generated QR code with the correct unique key
//   try {
//     const scannedData = await scanQRCode(
//       complexCode,
//       complexCode.split("-").pop()!,
//       1
//     );
//     console.log("Scanned Data:", scannedData);
//   } catch (error) {
//     console.error("Error scanning QR code:", error.message);
//   }

//   // Simulate processing a raw code input with the correct unique key
//   try {
//     const rawCodeData = complexCode;
//     const processedData = await processRawCode(
//       rawCodeData,
//       complexCode.split("-").pop()!,
//       1
//     );
//     console.log("Processed Data:", processedData);
//   } catch (error) {
//     console.error("Error processing raw code:", error.message);
//   }

//   // Simulate checking the book with the correct unique key
//   try {
//     const bookDetails = await checkBook(
//       complexCode,
//       complexCode.split("-").pop()!,
//       1
//     );
//     console.log("Checked Book Details:", bookDetails);
//   } catch (error) {
//     console.error("Error checking book:", error.message);
//   }
// })();
