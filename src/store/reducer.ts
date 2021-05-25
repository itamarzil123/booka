import { logger, LogTypes } from '../utils/logger.utils';
import {
  retrieveCurrentWishList,
  setCurrentLoggedInUser,
  setCurrentToken,
  setCurrentWishList
} from '../utils/storage.utils';

type Action =
  | { type: 'SET_TOKEN'; payload: string }
  | { type: 'SET_BOOKS'; payload: string }
  | { type: 'SET_NEW_POST'; payload: string }
  | { type: 'SET_LOGGED_IN_USER'; payload: any }
  | { type: 'TOGGLE_WISHLIST'; payload: any }
  | { type: 'SET_VIEW_MOD'; payload: any }
  | { type: 'CURRENT_SEARCHBAR_TEXT'; payload: any }
  | { type: 'SET_BOOK_SEARCH_START_INDEX'; payload: any }
  | { type: 'SET_ACTIVE_PAGE'; payload: any }
  | { type: 'SET_IS_LOADING'; payload: any }
  | { type: 'CURRENT_BOOK_CATEGORY'; payload: any }
  | { type: 'SET_SELECTED_FILTER'; payload: any }
  | { type: 'CURRENT_SORT_STRATEGY'; payload: any };

const Reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      if (action.payload !== null) {
        setCurrentToken(action.payload);
      }
      return {
        ...state,
        token: action.payload
      };
    case 'SET_LOGGED_IN_USER':
      if (action.payload !== null) {
        setCurrentToken(action.payload.token);
        setCurrentLoggedInUser(action.payload.username);
      }
      return {
        ...state,
        token: action.payload.token,
        loggedInUser: {
          username: action.payload.username,
          password: action.payload.password
        }
      };
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload
      };
    case 'TOGGLE_WISHLIST':
      const wishList = retrieveCurrentWishList();
      const inWishList = wishList.some(
        (elem: any): any => elem === action.payload
      );
      const updatedWishList = wishList.filter(
        (elem: any): any => elem !== action.payload
      );
      if (inWishList) {
        setCurrentWishList(updatedWishList);

        return {
          ...state,
          wishList: updatedWishList
        };
      } else {
        const updatedWishlist = [...wishList, action.payload];
        setCurrentWishList(updatedWishlist);
        return {
          ...state,
          wishList: updatedWishlist
        };
      }
    case 'SET_VIEW_MOD':
      if (action.payload !== state.viewMod) {
        return {
          ...state,
          viewMod: action.payload,
          bookSearchStartIndex: 0,
          activePage: 1
        };
      }
      return {
        ...state,
        viewMod: action.payload
      };
    case 'CURRENT_SEARCHBAR_TEXT':
      return {
        ...state,
        currentSearchBarText: action.payload
      };
    case 'SET_BOOK_SEARCH_START_INDEX':
      return {
        ...state,
        bookSearchStartIndex: action.payload
      };
    case 'SET_IS_LOADING':
      logger.info(LogTypes.State, 'SET_IS_LOADING:', action.payload);
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload
      };
    case 'CURRENT_BOOK_CATEGORY':
      return {
        ...state
      };
    case 'CURRENT_SORT_STRATEGY':
      return {
        ...state,
        currentSortStrategy: action.payload
      };
    case 'SET_SELECTED_FILTER':
      logger.info(LogTypes.State, 'SET_SELECTED_FILTER', action.payload);
      return {
        ...state,
        selectedFilter: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
