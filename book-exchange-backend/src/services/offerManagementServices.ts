// CREATE TABLE `offers` (
//     `offerId` int NOT NULL AUTO_INCREMENT,
//     `bookId` int DEFAULT NULL,
//     `offeredBy` int DEFAULT NULL,
//     `offeredTo` int DEFAULT NULL,
//     `status` enum('PENDING','ACCEPTED','REJECTED') DEFAULT 'PENDING',
//     `offerDetails` text,
//     `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
//     `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (`offerId`),
//     KEY `bookId` (`bookId`),
//     KEY `offeredBy` (`offeredBy`),
//     KEY `offeredTo` (`offeredTo`),
//     CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`),
//     CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`offeredBy`) REFERENCES `users` (`userId`),
//     CONSTRAINT `offers_ibfk_3` FOREIGN KEY (`offeredTo`) REFERENCES `users` (`userId`)
//   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

import { OfferCreate, OfferUpdate } from "@src/interfaces/Offer";
import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const adminViewAllOfferList = async () => {
  const connection = await pool.getConnection();
  try {
    const [row] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers`
    );
    if (row.length === 0) throw new Error("No offer list");
    return { message: "succesfully to get offers list by admin", offers: row };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Admin get offer list unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};

export const makeOffer = async (offer: OfferCreate) => {
  // Check at controller value is correct
  // check all these exist => bookId, offeredBy, offeredTo
  // Then insert these
  // Then have some feature make notification to offered To user.
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    // Check book is exist
    const [checkBookResult] = await connection.query<RowDataPacket[]>(
      `SELECT bookId from books where bookId = ?`,
      [offer.bookId]
    );
    if (checkBookResult.length === 0)
      throw new Error(`Cannot find bookId ${offer.bookId} in books`);

    // Check offeredBy user is exist
    const [checkOfferedBy] = await connection.query<RowDataPacket[]>(
      `SELECT userId from users where userId = ?`,
      [offer.offeredBy]
    );
    if (checkOfferedBy.length === 0)
      throw new Error("Can't find OfferedBy userID");

    // Check offeredTo user is exist
    const [checkofferedTo] = await connection.query<RowDataPacket[]>(
      `SELECT userId from users where userId = ?`,
      [offer.offeredTo]
    );
    if (checkofferedTo.length === 0)
      throw new Error("Can't find OfferedTo userId in users");

    // Insert
    const [insertResult] = await connection.query<ResultSetHeader>(
      `insert into offers (bookId, offeredBy, offeredTo, offerDetails) VALUES(?,?,?,?)`,
      [offer.bookId, offer.offeredBy, offer.offeredTo, offer.offerDetails]
    );

    if (insertResult.affectedRows === 0)
      throw new Error("Error create offer not completed");
    // FB
    const insertId = insertResult.insertId;
    const [insertRow] = await connection.query<RowDataPacket[]>(
      `SELECT * from offers where offerId = ?`,
      [insertId]
    );
    // Make notification after insert complete
    await connection.commit();
    return { message: "Offer created successfully", offerDetail: insertRow[0] };
  } catch (error) {
   await connection.rollback();
    throw new Error(
      error instanceof Error
        ? error.message
        : "makeOffer unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};

// Get a list of all offers for a user	/api/offers	GET	Query Params	/api/offers?userId=2
export const viewUserPendingList = async (userId: number) => {
  const connection = await pool.getConnection();
  try {
    const [checkUserId] = await connection.query<ResultSetHeader>(
      `SELECT * FROM users where userId = ?`,
      [userId]
    );

    if (checkUserId.affectedRows === 0)
      throw new Error(`Can't find userId = ${userId} in users`);

    const [userOfferRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers where (offeredBy = ? OR offeredTo = ?) AND status NOT IN ('COMPLETED', 'REJECTED') `,
      [userId, userId]
    );

    if (userOfferRow.length === 0)
      throw new Error(`Cant find any offer for this userId = ${userId}`);

    return {
      message: "succesfully to view all user offer list",
      offers: userOfferRow,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "viewUserOfferList unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};

// Get details of a specific offer	/api/offers/:offerId	GET	Params	/api/offers/1
// Check that offerId is exist
// Select
export const getOfferDetail = async (offerId: number) => {
  const connection = await pool.getConnection();
  try {
    const [checkOfferId] = await connection.query<RowDataPacket[]>(
      `SELECT offerId FROM offers where offerId = ?`,
      [offerId]
    );
    if (checkOfferId.length === 0)
      throw new Error(`Look like it not have offerId = ${offerId}`);
    const [offerRow] = await connection.query<RowDataPacket[]>(
      `SELECT 
      offers.offerId, 
      books.title, 
      userBy.username AS offeredBy, 
      userTo.username AS offeredTo, 
      offers.status, 
      offers.offerDetails, 
      offers.createAt, 
      offers.updateAt 
    FROM 
        offers
    INNER JOIN 
        books ON offers.bookId = books.bookId
    INNER JOIN 
        users AS userBy ON userBy.userId = offers.offeredBy
    INNER JOIN 
      users AS userTo ON userTo.userId = offers.offeredTo
      where offerId = ?`,
      [offerId]
    );
    if (offerRow.length === 0)
      throw new Error(`Can't find offer detail for offerId = ${offerId}`);

    return {
      message: "succesfully to get offer detail",
      offerDetail: offerRow[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "getOfferDetail unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};

// Update status of an offer (accept/reject)	/api/offers/:offerId	PUT	Params, Body	/api/offers/1 {"status": "ACCEPTED"}
// Check offerId is exist
// Check at controller Status is correct type // ACCEPTED or REJECTED
// UPDATED
// SELECT CHECK our put date is correct
// commmit

export const updateOfferStatus = async (offer: OfferUpdate) => {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const [checkOfferId] = await connection.query<RowDataPacket[]>(
      `SELECT offerId from offer where offerid = ?`,
      [offer.offerId]
    );
    if (checkOfferId.length === 0)
      throw new Error(`Update, OfferId = ${offer.offerId} not exist`);
    const [updateResult] = await connection.query<ResultSetHeader>(
      `UPDATE offers SET status = ? where offerId = ?`,
      [offer.status, offer.offerId]
    );
    if (updateResult.affectedRows === 0)
      throw new Error(
        `Error update offer status = ${offer.status} at offerId = ${offer.offerId} is not completed`
      );
    const [checkUpdateOffer] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers where offerId = ?`,
      [offer.offerId]
    );

    if (checkUpdateOffer.length === 0)
      throw new Error("Error cant find offer row");

    connection.commit();
    return {
      message: "succesfully to update offer status",
      row: checkUpdateOffer[0],
    };
  } catch (error) {
    connection.rollback();
    throw new Error(
      error instanceof Error
        ? error.message
        : "updateOfferStatus unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};

// Get offer history for the user	/api/users/offers/history	GET	Query Params	/api/users/offers/history?userId=2
// Check userId is exist in table
// Query
// Check Query
export const getOfferHistory = async (userId: number) => {
  const connection = await pool.getConnection();
  try {
    const [checkUserIdExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers WHERE offeredBy = ? OR offeredTo = ?')`,
      [userId, userId]
    );
    if (checkUserIdExist.length === 0)
      throw new Error(`User ${userId} is not exist on offers table`);
    const [userOfferRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers WHERE (offeredBy = ? OR offeredTo = ?) AND status IN ('COMPLETED', 'REJECTED')`,
      [userId, userId]
    );
    if (userOfferRow.length === 0)
      throw new Error(`Cant find any offer history form userId = ${userId}`);
    return {
      message: "succesfully to get user history",
      offerHistory: userOfferRow,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "getOfferHistory unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};
