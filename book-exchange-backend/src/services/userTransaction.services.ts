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
      `SELECT * FROM trnasactions where transacationId = ?`,
      [transactionId]
    );
    if (checkTransactionIdExist.length === 0)
      throw new Error(
        `Error, Cant find transaction at transacationId = ${transactionId}`
      );

    // Then check userId is exist
    const [checkUserIdExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ?`,
      [userId]
    );
    if (checkUserIdExist.length === 0)
      throw new Error(
        `Error, Cant find user in users where userId = ${userId}`
      );

    // if both exist insert into userTransacitonStatus
    const [resultInsertStatus] = await connection.query<ResultSetHeader>(
      `INSERT INTO userTransacitonStatus (transactionId, userId, status) VALUES(?, ?, ?)`,
      [transactionId, userId, status]
    );
    // Check insert Affetched row
    if (resultInsertStatus.affectedRows === 0)
      throw new Error("Error, insert userTransacitonStatus not successful.");

    // Select, Feedback check.
    const insertId = resultInsertStatus.insertId;
    const [rowUserTranStatus] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM userTransacitonStatus where id = ?`,
      [insertId]
    );
    if (rowUserTranStatus.length === 0)
      throw new Error(
        `Error, cant not find userTransactionStatus where id = ${insertId}`
      );

    return {
      message: "succesfully to insert userTransacitonStatus",
      data: rowUserTranStatus[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};

export const updateStatus = async (connection: PoolConnection ,tran: number, status:string) => {
    try {
        // Check Id isExist
        const [checkUserTranExist] = await connection.query<RowDataPacket[]>(`SELECT * FROM userTransacitonStatus where id = ?`,[id])
        if (checkUserTranExist.length === 0) throw new Error(`Error, cant find userTransacitonStatus where id = ${id}`)
        // Update Status
    const [resultUpdateStatus] = await connection.query<ResultSetHeader>(`UPDATE userTransacitonStatus SET status = ? where tran`,[])
        // Feedback Check
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unexpected error occurred.")
    }   
}
