// const GOOGLE_API_KEY = 'AIzaSyAf0sk6WDO-I4TxUgarlPs6v8dH8Yka4hk';
const GOOGLE_API_KEY2 = 'AIzaSyAtstonBK6P28QgKkVZe0UJmw4UeEu4feg';
const CURRENT_USED_KEY = GOOGLE_API_KEY2;
const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

export const generateUrl = {
  getBookWithPagination: (
    query: string,
    maxResults: number,
    startIndex: number
  ) => {
    return `${baseUrl}?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&key=${CURRENT_USED_KEY}`;
  },
  getBookById: (id: string) => {
    return `${baseUrl}/${id}?key=${CURRENT_USED_KEY}`;
  },
  getBooksSorted: (
    strategy: string,
    query: string,
    maxResults: number,
    startIndex: number
  ) => {
    return `${baseUrl}?q=${query}?maxResults=${maxResults}&startIndex=${startIndex}&orderBy=${strategy}&key=${CURRENT_USED_KEY}`;
  },
  // for example: https://www.googleapis.com/books/v1/volumes?q=+subject:drama&maxResults=20&startIndex=0&key=AIzaSyAf0sk6WDO-I4TxUgarlPs6v8dH8Yka4hk
  getBooksByCategory: (
    category: string,
    maxResults: number,
    startIndex: number
  ) => {
    return `${baseUrl}?q=+subject:${category}&maxResults=${maxResults}&startIndex=${startIndex}&key=${CURRENT_USED_KEY}`;
  },
  getOnlyEbooks: (maxResults: number, startIndex: number) =>
    `${baseUrl}?maxResults=${maxResults}&startIndex=${startIndex}&filter=ebooks&key=${CURRENT_USED_KEY}`,
  getPrintType: (maxResults: number, startIndex: number, printType: string) =>
    `${baseUrl}?maxResults=${maxResults}&startIndex=${startIndex}&printType=${printType}&key=${CURRENT_USED_KEY}`
};
