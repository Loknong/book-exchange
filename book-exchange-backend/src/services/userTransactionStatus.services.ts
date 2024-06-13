import { PoolConnection } from "mysql2/promise";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

/**
 * ! userTransactionStatus
 *  @params transactionId : number
 *  @params userId : number
 *  @params status : string
 */

export const insertUserTransactionStatus = async (
  connection: PoolConnection,
  transactionId: number,
  userId: number,
  status: string
) => {
  try {
    // Check transactionId is exist,
    const [checkTransactionIdExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM transactions where transactionId = ?`,
      [transactionId]
    );
    if (checkTransactionIdExist.length === 0)
      throw new Error(
        `Error, Cant find transaction at transactionId = ${transactionId}`
      );

    // Then check userId is exist
    // I think we check at this transaction , for offer, userId must have exist in offeredBy or offeredTo.
    // const [checkUserIdExist] = await connection.query<RowDataPacket[]>(
    //   `SELECT * FROM users where userId = ?`,
    //   [userId]
    // );
    const [checkUserIdExist] = await connection.query<RowDataPacket[]>(
      `select transactions.transactionId, offers.offerId, offers.offeredBy, offers.offeredTo from transactions
      inner join offers ON transactions.offerId = offers.offerId 
      where transactionId = ? AND (offeredBy = ? OR offeredTo = ?)`,
      [transactionId, userId, userId]
    );
    if (checkUserIdExist.length === 0)
      throw new Error(
        `Error, Cant find user in users where userId = ${userId}`
      );

    // if both exist insert into userTransactionStatus
    const [resultInsertStatus] = await connection.query<ResultSetHeader>(
      `INSERT INTO userTransactionStatus (transactionId, userId, status) VALUES(?, ?, ?)`,
      [transactionId, userId, status]
    );
    // Check insert Affetched row
    if (resultInsertStatus.affectedRows === 0)
      throw new Error("Error, insert userTransactionStatus not successful.");

    // Select, Feedback check.
    const insertId = resultInsertStatus.insertId;
    const [rowUserTranStatus] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userTransactionStatus where id = ?`,
      [insertId]
    );
    if (rowUserTranStatus.length === 0)
      throw new Error(
        `Error, cant not find userTransactionStatus where id = ${insertId}`
      );

    return {
      message: "succesfully to insert userTransactionStatus",
      data: rowUserTranStatus[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};

export const updateStatus = async (
  connection: PoolConnection,
  id: number,
  status: string
) => {
  try {
    // Check Id isExist
    const [checkUserTranExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userTransactionStatus where id = ?`,
      [id]
    );
    if (checkUserTranExist.length === 0)
      throw new Error(
        `Error, cant find userTransactionStatus where id = ${id}`
      );
    // Update Status
    const [resultUpdateStatus] = await connection.query<ResultSetHeader>(
      `UPDATE userTransactionStatus SET status = ? where id = ?`,
      [status, id]
    );
    if (resultUpdateStatus.affectedRows === 0)
      throw new Error(
        `Error, Cant update status to userTransactionStatus where`
      );
    // Feedback Check
    const [rowUserStatus] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userTransactionStatus where id = ?`,
      [id]
    );
    if (rowUserStatus.length === 0)
      throw new Error(`Error. No feedback for id = ${id}`);
    return {
      message: "succesfully to update userTransactionStatus.",
      data: rowUserStatus[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};

export const getUserTransactionStatusById = async (
  connection: PoolConnection,
  id: number
) => {
  try {
    // Check Id isExist
    const [checkUserTranExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userTransactionStatus where id = ?`,
      [id]
    );
    if (checkUserTranExist.length === 0)
      throw new Error(
        `Error, cant find userTransactionStatusById where id = ${id}`
      );
    // get
   
    const [rowUserStatus] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userTransactionStatus where id = ?`,
      [id]
    );
    if (rowUserStatus.length === 0)
      throw new Error(
        `Error. Can not get userTransactionStatusById for id = ${id}`
      );
    return {
      message: "succesfully to get userTransactionStatusById.",
      data: rowUserStatus[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};

export const getUserTransactionStatusByTransaction = async (
  connection: PoolConnection,
  transactionId: number
) => {
  try {
    // Check Id isExist
    const [checkUserTranExist] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM userTransactionStatus where transactionId = ?`,
        [transactionId]
      );
      if (checkUserTranExist.length === 0)
        throw new Error(
          `Error, cant find getUserTransactionStatusByTransaction where transactionId = ${transactionId}`
        );
      // get
     
      const [rowUserStatus] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM userTransactionStatus where transactionId = ?`,
        [transactionId]
      );
      if (rowUserStatus.length === 0)
        throw new Error(
          `Error. Can not get userTransactionStatusById for transactionId = ${transactionId}`
        );
      return {
        message: "succesfully to get userTransactionStatusById.",
        data: rowUserStatus,
      };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};
