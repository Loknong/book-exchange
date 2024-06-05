import { pool } from "./db";
import { User } from "../models/User";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

// Partial<> -> Utility type -> ทำให้ใส้ในเป็น optional
// export const createUser = async (user: User): Promise<User> => {
//   console.log("enter query", user);

//   const { firstName, lastName, email, username, userPassword } = user;
//   const [result] = await pool.query<ResultSetHeader>(
//     "INSERT INTO users (firstName, lastName, email, username, userPassword) VALUE(?, ?, ?, ?, ?)",
//     [firstName, lastName, email, username, userPassword]
//   );

//   const insertId = result.insertId;
//   const [rows] = await pool.query(`SELECT * FROM Users WHERE userId = ?`, [
//     insertId,
//   ]);
//   return (rows as User[])[0];
// };

// !ChatGPT improve
export const createUser = async (user: User): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    const { firstName, lastName, email, username, userPassword } = user;
    const [result] = await connection.query<ResultSetHeader>(
      "INSERT INTO users (firstName, lastName, email, username, userPassword) VALUE(?, ?, ?, ?, ?)",
      [firstName, lastName, email, username, userPassword]
    );
    
    const insertId = result.insertId;
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM Users WHERE userId = ?`,
      [insertId]
    );

    if (rows.length > 0) {
      return (rows as User[])[0];
    } else {
      throw new Error("User not found after insertion");
    }
  } catch (error) {
    if (error instanceof Error)
      console.error(`Error createing user: ${error.message}`);
    return null;
  } finally {
    connection.release();
  }
};

export const getUserById = async (userId: number): Promise<User | null> => {
  const [rows] = await pool.query(`SELECT * FROM Users WHERE userId = ?`, [
    userId,
  ]);
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
};
