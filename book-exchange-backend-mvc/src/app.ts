import express from "express";
import { corsMiddleware } from "./middlewares/corsMiddleware";

// for testing services
import { testFind, testPrismaConnection } from "./services/prismaService";

// prisma routes
import databaseRoute from "./routes/databaseManagement.routes";
import userPrismaRoute from "./routes/userAction.routes";

// playground
import {isValidState} from "./utils/testScript"

// new way
import userRoutes from "./api/user/user.routes"
import bookRoutes from "./api/books/book.routes"

const app = express();

console.log("Is Valid State:", isValidState);


app.use(corsMiddleware);
app.use(express.json());

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

// Migrate Prisma Routes
app.use("/v2/api/database", databaseRoute);
app.use("/v2/api/user", userPrismaRoute);

// Old
app.use("/uploads", express.static("uploads")); // Serve static files from 'uploads' directory


//newest
app.use("/api/users", userRoutes)
app.use("/api/books", bookRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
