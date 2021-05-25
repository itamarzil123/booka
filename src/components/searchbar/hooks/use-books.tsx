import { useContext } from 'react';
import { useQuery } from 'react-query';
import {
  getAllBooks as _getAllBooks,
  getBooksByCategory
} from '../../../services/rest/book.service';
import { Context } from '../../../store/store';
import useDebounce from './use-debounce';

type Props = {
  text: string;
  startIndex: number;
  onComplete(params: any): void;
  onErrors(params: any): void;
  type: string | null;
};
export const useBooks = ({
  text,
  startIndex,
  onComplete,
  onErrors,
  type
}: Props) => {
  const [state, dispatch] = useContext(Context) as any;

  const debouncedSearchQuery = useDebounce(text, 600);
  const { status, data, error, isFetching } = useQuery<any, any>(
    ['query', debouncedSearchQuery, startIndex, type],
    () => {
      if (!type && text !== '') {
        // dispatch({
        //   type: 'SET_IS_LOADING',
        //   payload: true
        // });
        const results = _getAllBooks(text, startIndex);
        return results;
      } else if (type === 'category' || text === '') {
        if (!state.selectedFilter) {
          // dispatch({
          //   type: 'SET_IS_LOADING',
          //   payload: true
          // });
          return getBooksByCategory('drama', startIndex);
        }
      } else {
        console.error('useBooks "type" not correct. ');
      }
    },
    {
      onSuccess: (books) => {
        onComplete(books);
        // dispatch({
        //   type: 'SET_IS_LOADING',
        //   payload: false
        // });
      },
      onError: (err) => {
        onErrors(err);
        // dispatch({
        //   type: 'SET_IS_LOADING',
        //   payload: false
        // });
      }
    }
  );

  return { isFetching, status, data };
};
