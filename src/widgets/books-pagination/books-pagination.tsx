import { useContext } from 'react';
import Books from '../../components/books/books';
import Wishlist from '../../components/wishlist/wishlist';
import { useWishlist } from '../../components/searchbar/hooks/use-wishlist';
import { FETCH_POLICY } from '../../config/ui.config';
import { Environments } from '../../constants/environment.constants';
import { Context } from '../../store/store';
import Pagination from '../pagination';
import { ViewMods } from '../../constants/view.constants';
import { __ENV__ } from '../../config/env.config';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { scrollToTop } from '../../utils/ui.utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1500px;
`;

function BooksPagination() {
  const [state, dispatch] = useContext(Context) as any;
  const { wishListBooks } = useWishlist({
    onCompleted: () => {},
    onError: () => {}
  });

  const books = state.books?.data?.items;

  const computeTotalPages = () => {
    let totalPages;
    if (state.viewMod === ViewMods.WISH_LIST) {
      totalPages = Math.ceil(
        wishListBooks?.length / FETCH_POLICY.ITEMS_PER_PAGE
      );
    } else {
      if (__ENV__ === Environments.TEST) {
        totalPages = Math.ceil(books?.length / FETCH_POLICY.ITEMS_PER_PAGE);
      } else {
        totalPages = null;
      }
    }
    return totalPages;
  };

  const totalPages = computeTotalPages();

  const handlePageSelect = (page: number) => {
    if (__ENV__ === Environments.TEST && page > totalPages!) {
      return;
    }
    if (page < 1) {
      return;
    }
    const newStartIndex = (page - 1) * FETCH_POLICY.ITEMS_PER_PAGE;
    dispatch({ type: 'SET_BOOK_SEARCH_START_INDEX', payload: newStartIndex });
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page });
    scrollToTop();
  };
  const renderBooksOrWishlist =
    state.viewMod === ViewMods.WISH_LIST ? <Wishlist /> : <Books />;
  return (
    <Container>
      {renderBooksOrWishlist}
      {books && (
        <Pagination
          activePage={state.activePage}
          itemsPerPage={FETCH_POLICY.ITEMS_PER_PAGE}
          handlePageSelect={handlePageSelect}
          totalPages={totalPages}
        />
      )}
    </Container>
  );
}

export default BooksPagination;
