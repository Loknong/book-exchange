import { Request, Response } from "express";
import { pool } from "@src/services/db";
import {
  getUserTransactionStatusById,
  getUserTransactionStatusByTransaction,
  insertUserTransactionStatus,
  updateStatus,
} from "@src/services/userTransactionStatus.services";

export const handleInsertUserStatus = async (
  req: Request<
    {},
    {},
    { transactionId: number; userId: number; status: string }
  >,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await insertUserTransactionStatus(
      connection,
      req.body.transactionId,
      req.body.userId,
      req.body.status
    );
    await connection.commit();
    res.status(200).json(result);
  } catch (error) {
    await connection.rollback();
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  } finally {
    connection.release();
  }
};

export const handleUpdateStatus = async (
  req: Request<{}, {}, { id: number; status: string }>,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await updateStatus(connection, req.body.id, req.body.status);
    await connection.commit();
    res.status(200).json(result);
  } catch (error) {
    await connection.rollback();
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  } finally {
    connection.release();
  }
};

export const handleGetById = async (
  req: Request<{ id: number }, {}, {}>,
  res: Response
) => {
  console.log("req.params", req.params);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await getUserTransactionStatusById(
      connection,
      req.params.id
    );
    await connection.commit();
    res.status(200).json(result);
  } catch (error) {
    await connection.rollback();
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  } finally {
    connection.release();
  }
};

export const handleGetByTransactionId = async (
  req: Request<{ transactionId: number }, {}, {}>,
  res: Response
) => {
  console.log("req.params", req.params);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await getUserTransactionStatusByTransaction(
      connection,
      req.params.transactionId
    );
    await connection.commit();
    res.status(200).json(result);
  } catch (error) {
    await connection.rollback();
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  } finally {
    connection.release();
  }
};
