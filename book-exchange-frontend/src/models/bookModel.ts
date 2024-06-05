export interface IBookDetail {
  title: string;
  author: string;
  description: string;
  owner: string;
}

export interface IBookList {
  books: IBookDetail[];
}
