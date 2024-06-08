export interface Book {
  bookId: number;
  title: string;
  author?: string;
  genreId: number;
  bookView: number;
  bookCondition?: string;
  description?: string;
  ownerId: number;
  uniqueId: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}
