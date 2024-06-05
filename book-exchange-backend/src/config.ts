// src/config.ts
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

console.log('Loaded environment variables:', {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});

export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3003,
  db: {
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    name: process.env.DB_NAME as string,
  }
};
