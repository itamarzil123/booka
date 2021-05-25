import { SyntheticEvent, useContext } from 'react';
import styled from 'styled-components';
import useComponentVisible from '../../hooks/use-component-visible';
import { useBooks } from './hooks/use-books';
import { Context } from '../../store/store';
import { IUser } from '../../types/user';
import Dropdown from '../dropdown/dropdown';
import { getBooksByCategory } from '../../services/rest/book.service';
import SearchInput from './search-input';
import './searchbar.css';
import { categoryItems } from '../../config/menus.config';

const SearchBarInputContainer = styled.div<{ isFocused?: boolean; ref?: any }>`
  display: flex;
  padding: 5px 15px;
  ${(props) => props.isFocused && 'box-shadow: #d6d6d6 0px 5px 5px 0px;'};
  font-family: var(--primary-font-family);
  @media (max-width: 650px) {
    display: block;
  }
`;

type Props = {
  loggedInUser: IUser;
};
function SearchBar({ loggedInUser }: Props) {
  const [state, dispatch] = useContext(Context) as any;
  const { data, isFetching } = useBooks({
    text: state.currentSearchBarText,
    startIndex: state.bookSearchStartIndex,
    onComplete: (books) => {
      if (!books) {
        return;
      }
      dispatch({
        type: 'SET_BOOKS',
        payload: books
      });
    },

    onErrors: () => {},
    type: null
  });

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);
  const handleSearchChange = (e: any) => {
    dispatch({ type: 'CURRENT_SEARCHBAR_TEXT', payload: e.target.value });
    dispatch({
      type: 'SET_SELECTED_FILTER',
      payload: null
    });
    dispatch({
      type: 'SET_ACTIVE_PAGE',
      payload: 1
    });
    dispatch({ type: 'SET_BOOK_SEARCH_START_INDEX', payload: 0 });
  };
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handleDropdownItemSelect = async (item: any) => {
    if (item === 'all') {
      dispatch({
        type: 'SET_SELECTED_FILTER',
        payload: null
      });
      return;
    }

    const updatedBooks = await getBooksByCategory(
      item,
      state.bookSearchStartIndex
    );
    dispatch({
      type: 'SET_BOOKS',
      payload: updatedBooks
    });
    dispatch({
      type: 'SET_SELECTED_FILTER',
      payload: item
    });
  };

  return (
    <div className="search-container">
      <SearchBarInputContainer
        isFocused={isComponentVisible}
        ref={ref}
        onClick={(e) => handleClick(e)}
      >
        <SearchInput
          placeholder="Search Booka.."
          value={state.currentSearchBarText}
          onChange={handleSearchChange}
          onClick={(e) => handleClick(e)}
        />
        <div className="search-icon"></div>
        <Dropdown
          menuItems={categoryItems}
          padding={'0px 15px'}
          title={'categories'}
          handleDropdownItemSelect={handleDropdownItemSelect}
        />
      </SearchBarInputContainer>
    </div>
  );
}

export default SearchBar;
