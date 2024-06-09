
# Using Transactions in MySQL with Node.js

1. **Begin Transaction**
   - `await connection.beginTransaction();`

2. **Perform Operations**
   - Execute SQL queries (e.g., INSERT, UPDATE).
   - Check results for success.

3. **Commit Transaction**
   - `await connection.commit();`
   - Saves all changes if operations succeed.

4. **Rollback Transaction**
   - `await connection.rollback();`
   - Reverts changes if any operation fails.

5. **Release Connection**
   - `connection.release();`
   - Always release the connection, typically in a `finally` block.

### Example:
```typescript
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  const [result1] = await connection.query("INSERT INTO table1 (column1) VALUES (?)", [value1]);
  if (result1.affectedRows === 0) throw new Error("Insert into table1 failed");
  const [result2] = await connection.query("INSERT INTO table2 (column2) VALUES (?)", [value2]);
  if (result2.affectedRows === 0) throw new Error("Insert into table2 failed");
  await connection.commit();
} catch (error) {
  await connection.rollback();
  console.error("Transaction failed:", error);
  throw new Error(error.message);
} finally {
  connection.release();
}
