export interface Book {
  bookId: number;
  title: string;
  author?: string;
  genre?: number;
  bookView: number;
  bookCondition?: string;
  description?: string;
  ownerId: number;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookInventory {
  bookId: number;
  title: string;
  author: string;
  genre: string;
  thumbnail: string;
  bookCondition: string;
  description: string;
  createAt: Date;
}
