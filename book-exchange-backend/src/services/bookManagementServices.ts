import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const getBooksList = async () => {
  const connection = await pool.getConnection();
  try {
    
  } catch (error) {
    throw new Error (error instanceof Error ? error.message : "Unexpected error occurred")
  } finally {
    connection.release()
  }
}


// export const getBooksList = async () => {
//     const connection = await pool.getConnection();
//     try {
      
//     } catch (error) {
//       throw new Error (error instanceof Error ? error.message : "Unexpected error occurred")
//     } finally {
//       connection.release()
//     }
//   }