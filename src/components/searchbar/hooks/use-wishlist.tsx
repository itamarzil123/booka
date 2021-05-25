import { useContext, useEffect, useState } from 'react';
import {
  filterBooksByText,
  getBooksByIds
} from '../../../services/rest/book.service';
import { Context } from '../../../store/store';
import { IBook } from '../../../types/book';
import { ViewMods } from '../../../constants/view.constants';

type Props = {
  onCompleted(params: any): void;
  onError(params: any): void;
};
export const useWishlist = ({ onCompleted, onError }: Props) => {
  const [wishListBooks, setWishListBooks] = useState<IBook[]>([]);
  const [state, dispatch] = useContext(Context) as any;

  useEffect(() => {
    if (!(state.viewMod === ViewMods.WISH_LIST)) {
      return;
    }
    // dispatch({
    //   type: 'SET_IS_LOADING',
    //   payload: true
    // });
    getBooksByIds(state.wishList).then((books: IBook[]) => {
      const filteredBooks = filterBooksByText(books, state.currentSearchBarTex);
      // dispatch({
      //   type: 'SET_IS_LOADING',
      //   payload: false
      // });
      setWishListBooks(filteredBooks);
    });
  }, [state.viewMod, state.wishList, state.currentSearchBarText]);

  return { wishListBooks };
};
