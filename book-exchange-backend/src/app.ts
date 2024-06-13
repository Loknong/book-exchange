import express from "express";
import { testConnection } from "./services/db"; // Adjust the path as needed
// import authRoutes from "./routes/legacy/authRoute";
import authRoutes from "./routes/userAuth.routes";
import userManageRoutes from "./routes/userManagement.routes"
// import bookRoutes from "./routes/legacy/booksRoute";
import bookRoutes from "./routes/bookManagement.routes";
import offerRoutes from "./routes/offerManagement.routes"

import userActionRoutes from "./routes/legacy/userActionRoute";
import userRoutes from "./routes/legacy/userRoute"
import { corsMiddleware } from "./middlewares/corsMiddleware";

// for testing services
import transactionRoutes from "./routes/transactions.routes.test"

const app = express();

app.use(corsMiddleware);
app.use(express.json());


// Test database connection route
app.get("/test-db", async (req, res) => {
  const result = await testConnection();
  res.send(result);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userManageRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/offers", offerRoutes);

// Services Test
app.use("/api/transactions", transactionRoutes);

// Old
app.use("/api/action", userActionRoutes);
app.use("/api", userRoutes);
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
