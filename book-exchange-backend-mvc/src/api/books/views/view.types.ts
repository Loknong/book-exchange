import { Book } from '../book.types';

export interface View {
  id: number;
  bookId: number;
  userId: number;
  viewedAt: Date;
}

export interface CreateViewPayload {
  bookId: number;
  userId: number;
}

export interface MostViewedBooks {
  books: {
    id: number;
    title: string;
    author: string;
    views: number;
  }[];
}
