import { Book } from '../book.types';

export interface FeaturedBooksResponse {
  featuredBooks: Book[];
}

export interface GenresResponse {
  genres: {
    id: number;
    name: string;
    bookCount: number;
  }[];
}

export interface RecentBooksResponse {
  books: Book[];
}

export interface MostViewedBooksResponse {
  books: Book[];
}

export interface SearchBooksResponse {
  books: Book[];
}
