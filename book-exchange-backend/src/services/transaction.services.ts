import { pool } from "./db";
import { ResultSetHeader,RowDataPacket } from "mysql2";


// Check is that Offer is exist 
export const createNewTransaction = async (offerId: number) => {
    const connection = await pool.getConnection()
    try {
        await connection.beginTransaction()
        
        const 


        await connection.commit()
        return {}
    } catch (error) {
        await connection.rollback()
        throw new Error(error instanceof Error ? error.message : "Create transaction unexpected error occurred.")
    } finally {
        connection.release()
    }
}
