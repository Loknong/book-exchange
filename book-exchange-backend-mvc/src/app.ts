import express from "express";
import { corsMiddleware } from "./middlewares/corsMiddleware";
import { testConnection } from "./services/db"; 

// my sql2
import authRoutes from "./routes/userAuth.routes";
import userManageRoutes from "./routes/userManagement.routes"
import bookRoutes from "./routes/bookManagement.routes";
import offerRoutes from "./routes/offerManagement.routes"



// for testing services
import transactionRoutes from "./routes/transactions.routes.test"
import userTransactionStatusRoutes from "./routes/userTransaction.routes.test"
import { testFind, testPrismaConnection } from "./services/prismaService";

// prisma routes
import databaseRoute  from "./routes/databaseManagement.routes"
import userPrismaRoute from "./routes/userAction.routes"



const app = express();

app.use(corsMiddleware);
app.use(express.json());


// Test database connection route
app.get("/test-db", async (req, res) => {
  const result = await testConnection();
  res.send(result);
});

// Test Prisma connection route
app.get("/test-prisma", async (req, res) => {
  const result = await testPrismaConnection();
  res.json(result);
});
// Test Prisma connection route
app.get("/test-prisma-get", async (req, res) => {
  const result = await testFind();
  res.json(result);
});

// MySQL Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userManageRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/offers", offerRoutes);

// Services Test
app.use("/api/transactions", transactionRoutes);
app.use("/api/user-transactions", userTransactionStatusRoutes);

// Migrate Prisma Routes
app.use("/v2/api/database", databaseRoute)
app.use("/v2/api/user", userPrismaRoute);


// Old
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
