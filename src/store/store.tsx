import { createContext, useReducer } from 'react';
import Reducer from './reducer';
import { SortingStrategies, ViewMods } from '../constants/view.constants';
import { IBook } from '../types/book';
import { IUser } from '../types/user';
import {
  retrieveCurrentLoggedInUser,
  retrieveCurrentToken,
  retrieveCurrentWishList
} from '../utils/storage.utils';

type State = {
  books: IBook[] | null;
  token: string;
  loggedInUser: IUser | null;
  wishList: any;
  error: string | null;
  viewMod: string;
  currentSearchBarText: string;
  currentSortStrategy: string;
  currentBookCategory: string | null;
  bookSearchStartIndex: number;
  selectedFilter: string | null;
  activePage: number;
  isLoading: boolean;
};

const initialState: State = {
  books: [],
  loggedInUser: retrieveCurrentLoggedInUser(),
  token: retrieveCurrentToken(),
  wishList: retrieveCurrentWishList(),
  viewMod: ViewMods.STANDARD,
  currentSearchBarText: '',
  currentSortStrategy: SortingStrategies.NONE,
  currentBookCategory: null,
  bookSearchStartIndex: 0,
  activePage: 1,
  error: null,
  isLoading: false,
  selectedFilter: null
};

const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch] as any}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default StoreProvider;
