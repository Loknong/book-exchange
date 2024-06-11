import { pool } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const insertStatusHistory = async (
  referenceTable: string,
  referenceId: number,
  status: string
) => {
  // check from args, if that id from that table status = args.status then we go next
  console.log("Enter Logging function");

  console.log(referenceTable);
  console.log(referenceId);
  console.log(status);

  const connection = await pool.getConnection();
  const getKeyRefId = (tableName: string) => {
    if (tableName === "offers" || "transactions" || "payments") {
      return tableName.slice(0, tableName.length - 1) + "Id";
    } else {
      return "managementId";
    }
  };
  let refId = getKeyRefId(referenceTable);
  console.log("refId", refId);

  // if(referenceTable === 'offers' ||  'transactions' || 'payments') {

  // }
  try {
    await connection.beginTransaction();
    console.log("1");
    let query = `SELECT * FROM ${referenceTable} WHERE ${refId} = ? AND status = ?`;

    const [checkStatusExist] = await connection.query<RowDataPacket[]>(query, [
      referenceId,
      status,
    ]);
    console.log("2");

    if (checkStatusExist.length === 0)
      throw new Error("Error, Recheck before logging not correct.");
    console.log("3");

    const [insertLogResult] = await connection.query<ResultSetHeader>(
      `INSERT INTO statusHistory (referenceTable, referenceId, status) VALUES(?, ?, ?)`,
      [referenceTable, referenceId, status]
    );
    console.log("4");

    if (insertLogResult.affectedRows === 0)
      throw new Error("Error insert logging not success");
    const insertLogId = insertLogResult.insertId;
    const [fbInsertLogging] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM statusHostory where historyId = `,
      [insertLogId]
    );
    console.log("5");

    if (fbInsertLogging.length === 0)
      throw new Error("Cant find new Logging that we insert previous");
    console.log("6");

    await connection.commit();
    return { insertStatus: true, insertData: fbInsertLogging[0] };
  } catch (error) {
    await connection.rollback();
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred"
    );
  } finally {
    connection.release();
  }
};
