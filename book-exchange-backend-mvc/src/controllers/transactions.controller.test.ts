import { createTransaction, getTransactionById, updateTransactionStatus } from "@src/services/transaction.services";
import { Request, Response } from "express";
import { pool } from "@src/services/db";

// Test by find existing offerId (use 4), and find offers that not binding to transaction
export const handleCreateTransaction = async (
  req: Request<{}, {}, {offerId: number}>,
  res: Response
) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    const result = await createTransaction(connection, req.body.offerId);
    // await insertStatusHistory(
    //   "offers",
    //   result.offerDetail.offerId,
    //   result.offerDetail.status
    // );
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  } finally {
    connection.release()
  }
};

// 
export const handleUpdateTransaction = async (req:Request<{},{},{transactionId : number, status: string}>, res:Response) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    const result = await updateTransactionStatus(connection, req.body.transactionId, req.body.status);
    // await insertStatusHistory(
    //   "offers",
    //   result.offerDetail.offerId,
    //   result.offerDetail.status
    // );
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
}

export const handleGetTransaciton = async (req:Request<{transactionId: number},{},{}>, res:Response) => {
  console.log("req.body", req.body);
  const connection = await pool.getConnection();
  try {
    const result = await getTransactionById(connection, req.params.transactionId);
    // await insertStatusHistory(
    //   "offers",
    //   result.offerDetail.offerId,
    //   result.offerDetail.status
    // );
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error:
        error instanceof Error ? error.message : "Unexpected error occurred",
    });
  }
}