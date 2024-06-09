import { User, UserLogin, UserSignup, UserProfile } from "@src/interfaces/User";
import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

/**
 *
 * 1) get pool connect to db
 * 2) try to ... query then get
 *   2.1) if select we get rows
 *   2.2) other get result ->select to check affected rows / insertId to confirm
 * 3) handle error
 * 4) release connection to db
 */

export const registerUser = async (user: UserSignup): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO users (firstName, lastName, email, username, userPassword VALUES(?, ?, ?, ?, ?)",)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userPassword,
      ]
    );

    const insertId = result.insertId;
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ?`,
      [insertId]
    );

    if (rows.length > 0) {
      return (rows as User[])[0];
    } else {
      throw new Error("User not found after insertion");
    }
  } catch (error) {
    if (error instanceof Error) console.error(`Error creating user: `, error);
    return null;
  } finally {
    connection.release();
  }
};

export const authenticateUser = async (user: UserLogin) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM users where username = ? AND userPassword = ?`,
      [user.username, user.userPassword]
    );

    if (rows.length > 0) {
      const [result] = await pool.query<ResultSetHeader>(
        `UPDATE users SET isLogin = TRUE where username = ? AND userPassword = ?`,
        [user.username, user.userPassword]
      );
      if (result.affectedRows > 0) {
        return { message: "Login successfully", user: rows[0] };
      } else {
        return { message: "Failed to update login status" };
      }
    } else {
      return { message: "Invalid credentials" };
    }
  } catch (error) {
    if (error instanceof Error)
      console.error("Error authenticate user:", error);
    return { message: "An error occurred during authentication" };
  } finally {
    connection.release();
  }
};

//! Adjsut Later
//? Need add more feature like Token, Blah Blah
export const logoutUser = async (userId: number) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE users SET isLogin = FALSE where userId = ?",
      [userId]
    );
    if (result.affectedRows === 0) return { message: "Logout Not succesfully" };

    // Other Funcion

    return { message: "Logout succesfully" };
  } catch (error) {
    if (error instanceof Error) console.error("Logout Error :", error);
    return { message: "Logout failed: Unknown error" };
  } finally {
    connection.release();
  }
};

// optional Add later
export const resetPassword = async (userId: number) => {
  const connection = await pool.getConnection();
  try {
    console.log(`Reset Password where userId = ${userId}`);
    const user = "mock";
    return { message: "Reset Password succesfully", user: user };
  } catch (error) {
    if (error instanceof Error) console.log(`Reset Password error is ${error}`);
    return { message: "Reset password not success Unknown error" };
  } finally {
    connection.release();
  }
};

// optional add later -> send back password link to user
export const forgotPassword = async (username: string, email: string) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where username = ? and email = ? ",
      [username, email]
    );
    if (rows.length === 0)
      return { message: "Username or Password not correct" };

    // Optional: Send back a password reset link instead of the actual password
    // const resetLink = generatePasswordResetLink(rows[0].username, rows[0].email);
    // return { message: "Password reset link sent to your email", resetLink };

    //! For testing return Direct password
    return { message: "This is your password", password: rows[0].password };
  } catch (error) {
    if (error instanceof Error) console.error(`Error is ${error}`);
    return { message: "Unknown error" };
  } finally {
    connection.release();
  }
};

export const verifyEmail = async () => {
  return { message: "verifyEmail not implemented yet" };
};

export const resendEmailVerification = async () => {
  return { message: "resendEmailVerification not implemented yet" };
};

// const connection = await pool.getConnection();
//   try {

//   } catch (error) {
//     if (error instanceof Error) console.error(`Error is ${error}`);

//   } finally {
//     connection.release()
//   }
