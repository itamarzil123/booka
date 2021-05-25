import { storageStrategy } from '../config/storage.config';

/**
 * A Workarround that is required for using the 'window' object with typescript.
 * Otherwise typescript complains about the 'key' type used for the 'window' object.
 */
const windowTyped = window as { [key: string]: any };

export const retrieveCurrentToken = () => {
  const tokenString = windowTyped[storageStrategy].getItem('token');
  const userToken = JSON.parse(tokenString as string);
  return userToken;
};

export const setCurrentToken = (token: string) => {
  windowTyped[storageStrategy].setItem('token', JSON.stringify(token));
};

export const retrieveCurrentLoggedInUser = () => {
  const userItem = windowTyped[storageStrategy].getItem('loggedInUser');
  const user = JSON.parse(userItem as string);
  return user;
};
export const setCurrentLoggedInUser = (username: string) => {
  windowTyped[storageStrategy].setItem(
    'loggedInUser',
    JSON.stringify({ username })
  );
};

export const clearToken = () => {
  windowTyped[storageStrategy].removeItem('token');
};
export const clearLoggedInUser = () => {
  windowTyped[storageStrategy].removeItem('loggedInUser');
};

export const retrieveCurrentWishList = () => {
  const wishList = windowTyped[storageStrategy].getItem('wishList');
  if (!wishList) {
    return [];
  }
  const wishListAsObj = JSON.parse(wishList);
  return wishListAsObj;
};

export const setCurrentWishList = (list: any) => {
  windowTyped[storageStrategy].setItem('wishList', JSON.stringify(list));
};
