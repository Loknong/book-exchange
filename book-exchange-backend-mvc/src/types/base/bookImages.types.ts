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
  