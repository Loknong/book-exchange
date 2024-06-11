import { User, UserLogin, UserSignup, UserProfile } from "@src/interfaces/User";
import { pool } from "./db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { error } from "console";

/**
 *
 * 1) get pool connect to db
 * 2) try to ... query then get
 *   2.1) if select we get rows
 *   2.2) other get result ->select to check affected rows / insertId to confirm
 * 3) handle error
 * 4) release connection to db
 */

// Version 1
export const registerUser2 = async (user: UserSignup): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO users (firstName, lastName, email, username, userPassword) VALUES(?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userPassword,
      ]
    );

    if (result.affectedRows === 0) throw new Error("Insert user error");
    const insertId = result.insertId;

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ?`,
      [insertId]
    );

    if (rows.length === 0) throw new Error("User not found after insertion");
    return (rows as User[])[0];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error creating user"
    );
  } finally {
    connection.release();
  }
};

// Version 2 after we add images table
export const registerUser3 = async (
  user: UserSignup,
  pictureName: string | undefined
): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO users (firstName, lastName, email, username, userPassword) VALUES(?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userPassword,
      ]
    );

    if (result.affectedRows === 0) throw new Error("Insert user error");
    const insertId = result.insertId;

    if (pictureName) {
      const [pictureResult] = await connection.query<ResultSetHeader>(
        "INSERT INTO userProfilePictures (userId, pictureName, isActive) VALUES(?, ? ,1)",
        [insertId, pictureName]
      );
      const pictureId = pictureResult.insertId;
      await connection.query<ResultSetHeader>(
        `UPDATE users SET userPictureId = ? WHERE userId = ?`,
        [pictureId, insertId]
      );
    }

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ?`,
      [insertId]
    );

    if (rows.length === 0) throw new Error("User not found after insertion");
    return (rows as User[])[0];
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error creating user"
    );
  } finally {
    connection.release();
  }
};

// Version 3 use Transition because we have too many query now
export const registerUser = async (
  user: UserSignup,
  pictureName: string | undefined
): Promise<User | null> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction(); // Start the transaction

    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO users (firstName, lastName, email, username, userPassword) VALUES(?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.userPassword,
      ]
    );

    if (result.affectedRows === 0) throw new Error("Insert user error");
    const insertId = result.insertId;

    if (pictureName) {
      const [pictureResult] = await connection.query<ResultSetHeader>(
        `INSERT INTO userProfilePictures (userId, pictureName, isActive) VALUES (?, ?, 1)`,
        [insertId, pictureName]
      );
      const pictureId = pictureResult.insertId;

      const [updateResult] = await connection.query<ResultSetHeader>(
        `UPDATE users SET userPictureId = ? WHERE userId = ?`,
        [pictureId, insertId]
      );
      if (updateResult.affectedRows === 0)
        throw new Error("Update userPictureId not successfully");
    }

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM users where userId = ?`,
      [insertId]
    );

    if (rows.length === 0) throw new Error("User not found after insertion");

    await connection.commit(); // Commit the transaction if all queries succeed
    return (rows as User[])[0];
  } catch (error) {
    await connection.rollback(); // Rollback the transaction if any query fails
    throw new Error(
      error instanceof Error ? error.message : "Error creating user"
    );
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

    if (rows.length === 0) throw new Error("Invalid credentials");

    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE users SET isLogin = TRUE where username = ? AND userPassword = ?`,
      [user.username, user.userPassword]
    );

    if (result.affectedRows === 0)
      throw new Error("Failed to update login status");
    return { message: "Login successfully", user: rows[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred during authentication"
    );
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
    if (result.affectedRows === 0) throw new Error("Logout Not succesfully");

    // Other Funcion

    return { message: "Logout succesfully" };
  } catch (error) {
    // if (error instanceof Error) console.error("Logout Error :", error);
    // return { message: "Logout failed: Unknown error" };
    throw new Error(
      error instanceof Error ? error.message : "An error occurred during logout"
    );
  } finally {
    connection.release();
  }
};

// optional Add later
export const resetPassword = async (userId: number, newPassword: string) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE users SET userPassword = ? where userId = ?",
      [newPassword, userId]
    );
    if (result.affectedRows === 0)
      throw new Error("Error update password fail");

    const [row] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users where userId = ?",
      [userId]
    );
    if (row.length === 0)
      throw new Error("Error cant selet that user after update");
    return { message: "Reset Password succesfully", user: row[0] };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred during Reset Password"
    );
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
    if (rows.length === 0) throw new Error("Username or Password not correct");
    //   return { message: "Username or Password not correct" };

    // Optional: Send back a password reset link instead of the actual password
    // const resetLink = generatePasswordResetLink(rows[0].username, rows[0].email);
    // return { message: "Password reset link sent to your email", resetLink };

    //! For testing return Direct password
    return { message: "This is your password", password: rows[0].userPassword };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred during deliver new password"
    );
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

export const getUserList = async () => {
  const connection = await pool.getConnection();
  try {
    const [userList] = await connection.query<
      RowDataPacket[]
    >(`SELECT users.userId, firstName, lastName, email, username, credit, userProfilePictures.pictureName FROM users
    LEFT JOIN userProfilePictures
    ON users.userPictureId = userProfilePictures.pictureId`);
    if (userList.length === 0) throw new Error("Cant get any user list");
    return { message: "succesfully to get user list", userList: userList };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  } finally {
    connection.release();
  }
};
