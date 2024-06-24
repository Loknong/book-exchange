import { BookStatus } from '@prisma/client';
import { Book } from '../book.types';

export interface AddUserBookPayload extends Book {
  ownerId: number;
}

export interface UpdateUserBookPayload {
  id: number;
  title?: string;
  author?: string;
  genreId?: number;
  condition?: string;
  description?: string;
  status?: BookStatus;
}
