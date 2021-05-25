import { __ENV__ } from '../../config/env.config';
import { books } from '../mock/data.service';
import Axios from 'axios';
import { Environments } from '../../constants/environment.constants';
import { generateUrl } from '../../utils/api.utils';
import { FETCH_POLICY } from '../../config/ui.config';
import { IBook } from '../../types/book';
import { logger, LogTypes } from '../../utils/logger.utils';

export const filterBooksByText = (books: IBook[], text: string) => {
  if (!books) {
    return [];
  }
  if (!text) {
    return books;
  }
  const filteredBooks = books.filter(
    (book: IBook) =>
      book?.volumeInfo &&
      book?.volumeInfo?.title &&
      book?.volumeInfo?.title.toLowerCase().includes(text.toLocaleLowerCase())
  );
  return filteredBooks;
};

const fetchBooks = async (text: any, startIndex?: number) => {
  if (__ENV__ === Environments.TEST) {
    const response = (await Promise.resolve(books)) as any;
    if (text === '') {
      return [];
    }
    response.data.items = filterBooksByText(response.data.items, text);
    return response;
  } else if (
    __ENV__ === Environments.PRODUCTION ||
    __ENV__ === Environments.DEVELOPMENT
  ) {
    const url = generateUrl.getBookWithPagination(
      text,
      FETCH_POLICY.REQUEST_LIMIT,
      startIndex || 1
    );

    let results;
    try {
      results = await Axios.get<any>(url);
    } catch (err) {
      console.error(err);
    }
    return results;
  }
};

export const getAllBooks = async (text: string, startIndex?: number) => {
  if (!text) {
    return;
  }

  const results = await fetchBooks(text, startIndex);
  logger.info(LogTypes.API, 'getAllBooks response:', results);
  return results;
};

export const getBookById = async (id: string) => {
  if (__ENV__ === Environments.TEST) {
    const response = (await Promise.resolve(books)) as any;
    if (!response.data && !response.data.items) {
      return [];
    }
    logger.info(LogTypes.API, 'getBookById data:', response.data);
    const filteredData = response.data.items.filter(
      (book: IBook): boolean => book.id === id
    );
    return filteredData[0];
  } else if (
    __ENV__ === Environments.PRODUCTION ||
    __ENV__ === Environments.DEVELOPMENT
  ) {
    const url = generateUrl.getBookById(id);
    let results;

    try {
      results = await Axios.get<any>(url);
    } catch (err) {
      console.error(err);
    }
    logger.info(LogTypes.API, 'getBookById data:', results);
    return results?.data;
  }
};

export const getBooksByIds = async (ids: string[]) => {
  const books = await Promise.all(
    ids.map(async (id) => {
      const book = await getBookById(id);
      return book;
    })
  );
  logger.info(LogTypes.API, 'getBookByIds data:', books);

  return books;
};

export const getBooksByCategory = async (
  category: string,
  startIndex: number
) => {
  if (__ENV__ === Environments.TEST) {
    const data = (await Promise.resolve(books)) as any;
    return data;
  } else if (
    __ENV__ === Environments.PRODUCTION ||
    __ENV__ === Environments.DEVELOPMENT
  ) {
    const url = generateUrl.getBooksByCategory(
      category,
      FETCH_POLICY.REQUEST_LIMIT,
      startIndex || 1
    );
    let results;
    try {
      results = await Axios.get<any>(url);
      logger.info(LogTypes.API, 'getBooksByCategory response', results);
    } catch (err) {
      console.error(err);
    }
    return results;
  }
};

export const getBooksSorted = async (
  query: string,
  strategy: string,
  startIndex: number
) => {
  if (__ENV__ === Environments.TEST) {
    const response = (await Promise.resolve(books)) as any;
    let comparator;
    if (strategy === 'newest') {
      comparator = (firstItem: any, secondItem: any) =>
        firstItem?.volumeInfo?.publishedDate >
        secondItem?.volumeInfo?.publishedDate;
    } else {
      comparator = (firstItem: any, secondItem: any) =>
        firstItem?.volumeInfo?.publishedDate <
        secondItem?.volumeInfo?.publishedDate;
    }
    response.data.items = response.data?.items.sort(comparator);
    return response;
  } else if (
    __ENV__ === Environments.PRODUCTION ||
    __ENV__ === Environments.DEVELOPMENT
  ) {
    const url = generateUrl.getBooksSorted(
      strategy,
      query,
      FETCH_POLICY.REQUEST_LIMIT,
      startIndex || 1
    );
    let results;
    try {
      results = await Axios.get<any>(url);
    } catch (err) {
      console.error(err);
    }
    logger.info(LogTypes.API, 'getBooksSorted response', results);
    return results;
  }
};
