import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../store/store';
import { IBook } from '../../types/book';
import Book from './book';
import Separator from '../separator/separator';
import { useBooks } from '../searchbar/hooks/use-books';
import Spinner from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const NoResults = styled.div`
  margin-top: 10%;
  font-size: 2.2em;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
`;

const SpinnerOverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  background-color: rgba(250, 246, 246, 0.3);
`;

function Books() {
  const [state, dispatch] = useContext(Context) as any;
  const { data, isFetching } = useBooks({
    text: state.currentSearchBarText,
    startIndex: state.bookSearchStartIndex,
    type: 'category',
    onComplete: (books) => {
      if (!books) {
        return;
      }
      dispatch({
        type: 'SET_BOOKS',
        payload: books
      });
    },

    onErrors: () => {}
  });

  const books = state.books?.data?.items;

  const renderBooks = (from?: number, to?: number) => {
    if (!books || books.length === 0) {
      return null;
    }
    if ((from || from === 0) && (to || to === 0)) {
      return books
        .slice(from, to)
        .map((book: IBook) => <Book key={book.id} book={book} />);
    } else {
      return books.map((book: IBook) => <Book key={book.id} book={book} />);
    }
  };

  const FilteredBooks = () => (
    <>
      {state.selectedFilter && <Separator title={`${state.selectedFilter}`} />}
      {renderBooks()}
      {!books ||
        (books.length === 0 && (
          <NoResults>{`No results matched your query: '${state.currentSearchBarText}'`}</NoResults>
        ))}
    </>
  );

  const DefaultBooks = () => (
    <>
      <Separator title={'Drama'} />
      {renderBooks(0, 4)}
      <Separator title={'Adventure'} />
      {renderBooks(5, 9)}
    </>
  );
  return (
    <Container>
      {isFetching && (
        <SpinnerContainer>
          <SpinnerOverLay />
          <Spinner type="Bars" color="#887f81" height={40} width={40} />
        </SpinnerContainer>
      )}
      {state.currentSearchBarText !== '' || state.selectedFilter ? (
        <FilteredBooks />
      ) : (
        <DefaultBooks />
      )}
    </Container>
  );
}

export default Books;
