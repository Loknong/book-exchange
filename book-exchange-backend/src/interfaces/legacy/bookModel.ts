export interface BookDetail {
  title: string;
  author: string;
  description: string;
  owner: string;
}

export interface BookList {
  books: BookDetail[];
}


