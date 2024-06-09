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

export interface BookCreate {
  title: string;
  author?: string;
  genreId: number;
  bookCondition?: string;
  description?: string;
  ownerId: number;
  thumbnail?: string;
}

export interface BookUpdate {
  title?: string;
  author?: string;
  genreId?: number;
  bookCondition?: string;
  description?: string;
  thumbnail?: string;
}