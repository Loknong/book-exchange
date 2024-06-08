import { User } from "@src/interfaces/legacy/User";
import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// export const authLogin = async (user: Partial<User>) => {
//     const {username, userPassword} = user
//   try {
//     const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM users WHERE username = ? AND userPassword = ?`,[username, userPassword]);
//     console.log(rows);

//     if (rows.length === 0) {
//         return { message: "Invalud credentials" }
//     }
//     return { message: "Login successfully", user: rows[0] }
//   } catch (error) {
//     console.log("error");

//   }
// }

// Concept select where username = ? and password = ?
// if has row we do ..., if hasnt we do ...., if error we do ...

export const authLogin = async (user: Partial<User>) => {
  const connection = await pool.getConnection();
  try {
    const { username, userPassword } = user;
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE username = ? AND userPassword = ?`,
      [username, userPassword]
    );
console.log(rows);

    if (rows.length === 0) {
      return { message: "Invalid credentials" };
    } else {
      return { message: "Login successfully", user: rows[0] };
    }
  } catch (error) {
    if (error instanceof Error) console.error(`Error is`, error);
    return null;
  } finally {
    connection.release();
  }
};
