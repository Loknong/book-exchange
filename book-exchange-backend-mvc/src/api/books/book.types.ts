import { BookStatus } from "@prisma/client";

export interface Book {
  id: number;
  title: string;
  author?: string;
  genreId: number;
  views: number;
  condition: string;
  description?: string;
  ownerId: number;
  status: BookStatus;
  bookImageId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookRequest {
  title: string;
  author?: string;
  genreId: number;
  condition: string;
  description?: string;
  ownerId: number;
  status: BookStatus;
  bookImageId: number;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  genreId?: number;
  condition?: string;
  description?: string;
  ownerId?: number;
  status?: BookStatus;
  bookImageId?: number;
}

export interface BookResponse {
  id: number;
  title: string;
  author?: string | null;
  genreId: number;
  views: number;
  condition: string;
  description?: string | null;
  ownerId: number;
  status: BookStatus;
  bookImageId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Book Image
export interface BookImage {
    id: number;
    bookId: number;
    name: string;
    createdAt: Date;
    isActive: boolean;
    isDeleted: boolean;
  }
  
  export interface CreateBookImageRequest {
    bookId: number;
    name: string;
  }
  
  export interface UpdateBookImageRequest {
    bookId?: number;
    name?: string;
    isActive?: boolean;
    isDeleted?: boolean;
  }
  
  export interface BookImageResponse {
    id: number;
    bookId: number;
    name: string;
    createdAt: Date;
    isActive: boolean;
    isDeleted: boolean;
  }
  