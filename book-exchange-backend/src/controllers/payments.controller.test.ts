import { Request, Response } from "express";
import { pool } from "@src/services/db";
import {
  getPaymentById,
  getPaymentsByTransactionId,
  insertPayment,
  updateStatus,
} from "@src/services/payment.services";

export const handleInsertPayment = async (
  req: Request<
    {},
    {},
    { transactionId: number; userId: number; amount: number; status: string }
  >,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await insertPayment(
      connection,
      req.body.transactionId,
      req.body.userId,
      req.body.amount,
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
  req: Request<{}, {}, { paymentId: number; status: string }>,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await updateStatus(
      connection,
      req.body.paymentId,
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

export const handleGetPaymentById = async (
  req: Request<{}, {}, { paymentId: number }>,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await getPaymentById(connection, req.body.paymentId);
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

export const handleGetPaymentsByTransactionId = async (
  req: Request<{}, {}, { transactionId: number }>,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await getPaymentsByTransactionId(
      connection,
      req.body.transactionId
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
