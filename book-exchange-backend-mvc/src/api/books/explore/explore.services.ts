import { PrismaClient } from "@prisma/client";

interface BookQueryParams {
  prisma: PrismaClient;
  title?: string;
  author?: string;
  genres?: string;
  sort?: string;
  page?: number;
  limit?: number;
  view?: string;
}

export const getBookListings = async ({
  prisma,
  title,
  author,
  genres,
  sort = "asc",
  page = 1,
  limit = 10,
  view,
}: BookQueryParams) => {
  const whereClause: any = {
    AND: [],
  };

  if (title) {
    whereClause.AND.push({ title: { contains: title } });
  }
  if (author) {
    whereClause.AND.push({ author: { contains: author } });
  }

  if (genres) {
    const genreArray = genres.split(",");
    console.log("genreArray", genreArray);

    whereClause.AND.push({
      genre: { name: { in: genreArray } },
    });
  }
  if (view) {
    switch (view) {
      case "most":
        whereClause.AND.push({ views: { gte: 0 } }); // Add custom logic as needed
        break;
      case "recent":
        whereClause.AND.push({
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });
        break;
      default:
        break;
    }
  }

  const totalItems = await prisma.books.count({ where: whereClause });

  const books = await prisma.books.findMany({
    where: whereClause,
    orderBy: { views: sort } as any,
    skip: (page - 1) * limit,
    take: limit,
    include: {
      genre: true,
    },
  });

  return {
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
    books,
  };
};
// SQL Way
/**
 * Count Total Items:
 * SELECT COUNT(*) FROM books WHERE title LIKE '%title%' AND author LIKE '%author%' AND genre IN ('genre1', 'genre2');
  * Fetch Paginated Books:
  * SELECT * FROM books 
    WHERE title LIKE '%title%' AND author LIKE '%author%' AND genre IN ('genre1', 'genre2') 
    ORDER BY popularity ASC 
    LIMIT 10 OFFSET 20;
 */

// Prisma Operations
/**
 * Count Total Items:
 * const totalItems = await prisma.books.count({
  where: {
    title: { contains: title, mode: "insensitive" },
    author: { contains: author, mode: "insensitive" },
    genre: { name: { in: genres.split(","), mode: "insensitive" } },
  },
});
* Fetch Paginated Books:
    * const books = await prisma.books.findMany({
    where: {
        title: { contains: title, mode: "insensitive" },
        author: { contains: author, mode: "insensitive" },
        genre: { name: { in: genres.split(","), mode: "insensitive" } },
    },
    orderBy: {
        popularity: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
    include: {
        genre: true,
    },
    });
 */
