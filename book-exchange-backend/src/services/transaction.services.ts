import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Check is that Offer is exist
// Then create our transacation
// Then Wait
export const createNewTransaction = async (offerId: number) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [checkOfferExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM offers where offerId = ?`,
      [offerId]
    );
    if (checkOfferExist.length === 0)
      throw new Error(`Can't find in offers where offerId = ${offerId}`);

    // Create transaction
    const [resultCreateTransaction] = await connection.query<ResultSetHeader>(
      `INSERT INTO transactions (offerId), VALUES(?)`,
      [offerId]
    );
    if (resultCreateTransaction.affectedRows === 0)
      throw new Error(`Create transaction not succesfully for some reason.`);

    const transacationInsertId = resultCreateTransaction.insertId;

    // FB Check.
    const [checkTranasctionExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM transactions where managementId = ? `,
      [transacationInsertId]
    );

    if (checkTranasctionExist.length === 0)
      throw new Error("Cant find transacation that insert.");

    await connection.commit();
    return {
      message: "Create transacation succesfully",
      data: checkTranasctionExist[0],
    };
  } catch (error) {
    await connection.rollback();
    throw new Error(
      error instanceof Error
        ? error.message
        : "Create transaction unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};
