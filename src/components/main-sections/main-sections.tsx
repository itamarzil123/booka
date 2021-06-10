import styled from 'styled-components';
import BooksPagination from '../../widgets/books-pagination/books-pagination';
import Filters from '../filters/filters';

const Container = styled.div`
  display: flex;
  padding: 6% 5%;
`;

function MainSections() {
  return (
    <Container>
      <Filters />
      <BooksPagination />
    </Container>
  );
}

export default MainSections;
