import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../store/store';
import { IBook } from '../../types/book';
import { useWishlist } from '../searchbar/hooks/use-wishlist';
import Book from '../books/book';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 1500px;
`;

function Wishlist() {
  const [state, dispatch] = useContext(Context) as any;
  const { wishListBooks } = useWishlist({
    onCompleted: () => {},
    onError: () => {}
  });
  return (
    <Container>
      {wishListBooks &&
        wishListBooks.length > 0 &&
        wishListBooks.map((book: IBook) => <Book key={book.id} book={book} />)}
    </Container>
  );
}

export default Wishlist;
