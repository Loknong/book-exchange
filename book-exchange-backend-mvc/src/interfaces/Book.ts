export interface Book {
  bookId?: number;
  title: string;
  author?: string;
  genreId: number;
  bookView?: number;
  bookCondition?: string;
  description?: string;
  ownerId: number;
  uniqueId?: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  status : 'public' | 'private';
}

export interface BookList {
  bookList: Book[];
}

export interface BookCreate {
  title: string;
  author?: string;
  genreId: string;
  bookCondition?: string;
  description?: string;
  ownerId: string;
  thumbnail?: string;
}

export interface BookUpdate {
  title?: string;
  author?: string;
  genreId: number;
  bookCondition?: string;
  description?: string;
  thumbnail?: string;
}

export interface GetBooksListParams {
  search?: string;
  filter?: string;
  sort?: string;
}