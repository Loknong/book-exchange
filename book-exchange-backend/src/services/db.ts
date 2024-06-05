// src/services/db.ts
import mysql from 'mysql2/promise';
import { config } from '../config';

export const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return "Database connection successful";
  } catch (error) {
    if (error instanceof Error) {
      return `Database connection failed: ${error.message}`;
    }
    return 'Database connection failed: Unknown error';
  }
};
