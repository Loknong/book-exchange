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

// export interface Book {
//   bookId: number;
//   title: string;
//   author?: string;
//   genre?: string;
//   bookView: number;
//   bookCondition?: string;
//   description?: string;
//   ownerId: number;
//   uniqueId: string;
//   thumbnail?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
