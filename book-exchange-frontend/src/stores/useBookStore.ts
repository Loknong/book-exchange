import { create } from "zustand";

interface IBook {
  bookId: number;
  title: string;
  author: string;
  description: string;
  owner: number;
}

interface IBookState {
  books: IBook[];
  addBook: (book: IBook) => void;
  setBooks: (book: IBook[]) => void;
}

export const useBookStore = create<IBookState>((set) => ({
  books: [],
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  setBooks: (books) => set({ books }),
}));
