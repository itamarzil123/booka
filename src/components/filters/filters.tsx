import { useContext } from 'react';
import { Context } from '../../store/store';
import Filter from './filter/filter';
import FlatFilter from '../flat-filter/flat-filter';
import styled from 'styled-components';
import { getBooksSorted } from '../../services/rest/book.service';
import {
  formatItems,
  languageItems,
  previewItems,
  sortByItems
} from '../../config/menus.config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff0f0;
  padding: 48px;
  @media (max-width: 650px) {
    display: none;
  }
`;

function Filters() {
  const [state, dispatch] = useContext(Context) as any;

  const handleDropdownItemSelect = async (item: any) => {
    switch (item) {
      case sortByItems[0].title:
        const updatedBooks = await getBooksSorted(
          state.currentSearchBarText,
          state.books,
          sortByItems[0].title,
          state.bookSearchStartIndex
        );
        dispatch({
          type: 'SET_BOOKS',
          payload: updatedBooks
        });
        break;
      case sortByItems[1].title:
        const updatedBooks1 = await getBooksSorted(
          state.currentSearchBarText,
          state.books,
          sortByItems[1].title,
          state.bookSearchStartIndex
        );
        dispatch({
          type: 'SET_BOOKS',
          payload: updatedBooks1
        });
        break;
      case 'all':
        const updatedBooks2 = await getBooksSorted(
          state.currentSearchBarText,
          state.books,
          sortByItems[1].title,
          state.bookSearchStartIndex
        );
        dispatch({
          type: 'SET_BOOKS',
          payload: updatedBooks2
        });
        dispatch({
          type: 'SET_SELECTED_FILTER',
          payload: null
        });
        break;
      case previewItems[0].title:
      case previewItems[1].title:
      case previewItems[2].title:
        break;
      case languageItems[0].title:
      case languageItems[1].title:
        break;
      case formatItems[0].title:
      case formatItems[1].title:
      case formatItems[2].title:
        break;
      default:
        console.error('handleDropDown switch case error');
    }
  };
  return (
    <Container>
      <Filter
        title={'Sort By:'}
        handleDropdownItemSelect={handleDropdownItemSelect}
        items={sortByItems}
      ></Filter>
      <FlatFilter
        title="format"
        items={formatItems}
        handleDropdownItemSelect={handleDropdownItemSelect}
      />
      <FlatFilter
        title="preview"
        items={previewItems}
        handleDropdownItemSelect={handleDropdownItemSelect}
      />
      <FlatFilter
        title="language"
        items={languageItems}
        handleDropdownItemSelect={handleDropdownItemSelect}
      />
    </Container>
  );
}

export default Filters;
