import { PrismaClient } from "@prisma/client";

// Add Genres
export const addGenres = async (prisma: PrismaClient, name: string) => {
  const genre = await prisma.genres.create({ data: { name } });
  const genres = await prisma.genres.findMany({
    orderBy: { id: "asc" },
  });
  return { newGenre: genre, newGenresList: genres };
};

// Get Genres
export const getGenres = async (prisma: PrismaClient) => {
  const genres = await prisma.genres.findMany({
    orderBy: { id: "asc" },
  });
  //   console.log("Genres:", genres);

  return genres;
};

// Update Genres
export const updateGenres = async (
  prisma: PrismaClient,
  id: number,
  name: string
) => {
  console.log("Name", name);

  const genre = await prisma.genres.update({
    where: { id },
    data: {
      name,
    },
  });
  return genre;
};

// Delete Genres
export const deleteGenres = async (prisma: PrismaClient, genreId: number) => {
  const deletedGenre = await prisma.genres.delete({ where: { id: genreId } });
  const genres = await prisma.genres.findMany({
    orderBy: { id: "asc" },
  });
  return { deletedGenre, newGenresList: genres };
};
