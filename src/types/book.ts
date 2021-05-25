import { Objectish } from './globals';

export interface IAuthor {
  author: string;
}
export interface IimagesLinkes {
  thumbnail: any;
}

export interface ICategory {
  category: string;
}
export interface IVolumeInfo {
  title: string;
  authors: IAuthor[];
  imageLinks: IimagesLinkes;
  subtitle: string;
  categories: ICategory[];
  description: string;
  previewLink: string;
  averageRating: any;
  publisherDate: any;
  language: string;
}

export interface ISaleInfo {
  saleability: string;
  isEbook: boolean;
  country: string;
  buyLink: string;
}

export interface IBook {
  id: string;
  title: string;
  author: string;
  image?: string;
  description?: string;
  volumeInfo?: IVolumeInfo;
  saleInfo?: ISaleInfo;
}

export interface IBooks {
  books: IBook[];
}

export type TUser = {
  username: string;
  password: string;
  email?: string;
  image?: string;
  firstname?: string;
  lastname?: string;
};
