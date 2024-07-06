import { PrismaClient } from "@prisma/client";
import prisma from "@src/services/prismaService";

// Add Genres


// Get Genres
export const template = async () => {
  const genres = await prisma.genres.findMany()
  console.log("Genres:", genres);
  
  return genres
}

// Update Genres


// Update Genres