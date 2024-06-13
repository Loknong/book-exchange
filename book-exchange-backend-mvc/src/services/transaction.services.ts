import { PoolConnection } from "mysql2/promise";
// import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Check is that Offer is exist
// Then create our transacation
// Then Wait
//? Old Version use inside connection.
// export const createTransaction = async (offerId: number) => {
//   const connection = await pool.getConnection()
//   try {
//     await connection.beginTransaction();

//     const [checkOfferExist] = await connection.query<RowDataPacket[]>(
//       `SELECT * FROM offers where offerId = ?`,
//       [offerId]
//     );
//     if (checkOfferExist.length === 0)
//       throw new Error(`Can't find in offers where offerId = ${offerId}`);

//     // Create transaction
//     const [resultCreateTransaction] = await connection.query<ResultSetHeader>(
//       `INSERT INTO transactions (offerId), VALUES(?)`,
//       [offerId]
//     );
//     if (resultCreateTransaction.affectedRows === 0)
//       throw new Error(`Create transaction not succesfully for some reason.`);

//     const transacationInsertId = resultCreateTransaction.insertId;

//     // FB Check.
//     const [checkTranasctionExist] = await connection.query<RowDataPacket[]>(
//       `SELECT * FROM transactions where managementId = ? `,
//       [transacationInsertId]
//     );

//     if (checkTranasctionExist.length === 0)
//       throw new Error("Cant find transacation that insert.");

//     await connection.commit();
//     return {
//       message: "Create transacation succesfully",
//       data: checkTranasctionExist[0],
//     };
//   } catch (error) {
//     await connection.rollback();
//     throw new Error(
//       error instanceof Error
//         ? error.message
//         : "Create transaction unexpected error occurred."
//     );
//   } finally {
//     connection.release();
//   }
// };

//! New Version pass argument connection: PoolConnection
export const createTransaction = async (
  connection: PoolConnection,
  offerId: number,
) => {
  try {
    // check offerId exist
    const [checkOfferIsExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers where offerId = ?`,
      [offerId]
    );
    if (checkOfferIsExist.length === 0)
      throw new Error(
        `Error create transaction, cant find offerId = ${offerId}`
      );

    // insert
    const [resultCreateTransaction] = await connection.query<ResultSetHeader>(
      `INSERT INTO transactions (offerId) VALUES(?)`,
      [offerId]
    );
    // check affectedRows
    if (resultCreateTransaction.affectedRows === 0)
      throw new Error("Error when insert into transcaitons tables");
    const transacationInsertId = resultCreateTransaction.insertId;
    // get insertId select check that insertId exist
    const [checkInsertExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM transactions where transactionId = ?`,
      [transacationInsertId]
    );

    if (checkInsertExist.length === 0)
      throw new Error("Error Feedback trnasactions insert not  found.");
    return {
      message: "succesfully to craete transaciton",
      data: checkInsertExist[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Create transacation unexpected error occurred."
    );
  }
};

//? Update status of existing transaction.
// 1) Check transaction Id is exist
// 2) update status
// 3) check affetched row, check status = status that we update.
export const updateTransactionStatus = async (
  connection: PoolConnection,
  transactionId: number,
  status: string
) => {
  try {
    // Check TransactionID exist
    const [checkTransactionExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM transactions where transactionId = ?`,
      [transactionId]
    );
    if (checkTransactionExist.length === 0)
      throw new Error(
        `Update transaction error! , cant find transacation where transactionId = ${transactionId}`
      );

    // Update
    const [resultUpdateTransaction] = await connection.query<ResultSetHeader>(
      `UPDATE transactions SET status = ? where transactionId = ?`,
      [status, transactionId]
    );
    if (resultUpdateTransaction.affectedRows === 0)
      throw new Error(`Update transaciton error!, affectedRows === 0 `);

    // Feedback Update Check
    const [checkTransactionUpdateRow] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM transactions where transactionId = ?`,
      [transactionId]
    );
    if (checkTransactionUpdateRow.length === 0)
      throw new Error(`Error, Cant find updated transaciton rows data.`);
    if (checkTransactionUpdateRow[0].status !== `${status}`)
      throw new Error(
        `Error, update wrong status. I want ${status} but we got ${checkTransactionUpdateRow[0].status}`
      );


    return {message:"succesfully to update status", data:checkTransactionUpdateRow[0]};
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Update transaction unexpected error occurred."
    );
  }
};


export const getTransactionById = async (connection:PoolConnection, transactionId: number) => {

  try {
    // check transactionId exist
    const [transacationRow] = await connection.query<RowDataPacket[]>(`SELECT * FROM transactions where transactionId = ?`,[transactionId])
    if(transacationRow.length === 0) throw new Error(`Error! no data for transactionId = ${transactionId}`)

    //return
    return {message: "succesfully to get transacationById", data:transacationRow[0]}
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unexpected error occurred.")
  }
  
}