import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PoolConnection } from "mysql2/promise";

export const insertPayment = async (
  connection: PoolConnection,
  transactionId: number,
  userId: number,
  amount: number,
  status: string
) => {
  try {
    // Check if transaciton exists
    const [checkTransactionExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM transacitons WHERE transactionId = ?`,
      [transactionId]
    );

    if (checkTransactionExist.length === 0)
      throw new Error(
        `Error, cannot find transactiokn with transactionId = ${transactionId}`
      );

    // Check if user is part of the transaction
    const [checkUserInTransaction] = await connection.query<RowDataPacket[]>(
      `SELECT offers.offeredBy, offers.offeredTo FROM transactions
             INNER JOIN offers ON transactions.offerId = offers.offerId
             WHERE transactions.transactionId = ? AND (offers.offeredBy = ? OR offers.offeredTo = ?)`,
      [transactionId, userId, userId]
    );
    if (checkUserInTransaction.length === 0)
      throw new Error(
        `Error, user is not part of the transaction with transactionId = ${transactionId}`
      );

    // Check for duplicate pending payments
    const [checkDuplicatePayment] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM payments WHERE transactionId = ? AND status = 'PENDING'`,
      [transactionId]
    );
    if (checkDuplicatePayment.length > 0)
      throw new Error(
        `Error, duplicate pending payment found for transactionId = ${transactionId}`
      );

    // Insert payment
    const [resultInsertPayment] = await connection.query<ResultSetHeader>(
      `INSERT INTO payments (transactionId, userId, amount, status) VALUES (?, ?, ?, ?)`,
      [transactionId, userId, amount, status]
    );
    if (resultInsertPayment.affectedRows === 0)
      throw new Error(
        `Error, unable to insert payment for transactionId = ${transactionId}`
      );

    // Fetch the inserted payment
    const paymentId = resultInsertPayment.insertId;
    const [newPayment] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM payments WHERE paymentId = ?`,
      [paymentId]
    );
    if (newPayment.length === 0)
      throw new Error(
        `Error, unable to retrieve newly inserted payment with paymentId = ${paymentId}`
      );

    return {
      message: "Payment inserted successfully",
      data: newPayment[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};

export const updateStatus = async (
  connection: PoolConnection,
  paymentId: number,
  status: string
) => {
  try {
    // Check if payment exists
    const [checkPaymentExist] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM payments WHERE paymentId = ?`,
      [paymentId]
    );
    if (checkPaymentExist.length === 0)
      throw new Error(
        `Error, cannot find payment with paymentId = ${paymentId}`
      );

    // Update payment status
    const [resultUpdateStatus] = await connection.query<ResultSetHeader>(
      `UPDATE payments SET status = ? WHERE paymentId = ?`,
      [status, paymentId]
    );
    if (resultUpdateStatus.affectedRows === 0)
      throw new Error(
        `Error, unable to update status for paymentId = ${paymentId}`
      );

    // Fetch the updated payment
    const [updatedPayment] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM payments WHERE paymentId = ?`,
      [paymentId]
    );
    if (updatedPayment.length === 0)
      throw new Error(
        `Error, unable to retrieve updated payment with paymentId = ${paymentId}`
      );

    return {
      message: "Payment status updated successfully",
      data: updatedPayment[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unexpected error occurred."
    );
  }
};

export const getPaymentById = async (
  connection: PoolConnection,
  paymentId: number
) => {
  try {
    // Check if payment exists
    const [payment] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM payments WHERE paymentId = ?`,
      [paymentId]
    );
    if (payment.length === 0)
      throw new Error(
        `Error, cannot find payment with paymentId = ${paymentId}`
      );

    return {
      message: "Payment retrieved successfully",
      data: payment[0],
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred during getPaymentById."
    );
  }
};

export const getPaymentsByTransactionId = async (
  connection: PoolConnection,
  transactionId: number
) => {
  try {
    // Check if payments exist for the given transactionId
    const [payments] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM payments WHERE transactionId = ?`,
      [transactionId]
    );
    if (payments.length === 0)
      throw new Error(
        `Error, cannot find payments with transactionId = ${transactionId}`
      );

    return {
      message: "Payments retrieved successfully",
      data: payments,
    };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unexpected error occurred during getPaymentsByTransactionId."
    );
  }
};
