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
import { IMAGES } from '../../constants/image.constants';

const SearchBarInputContainer = styled.div<{ isFocused?: boolean; ref?: any }>`
  display: flex;
  align-items: center;
  ${(props) => props.isFocused && 'box-shadow: #d6d6d6 0px 5px 5px 0px;'};
  font-family: var(--primary-font-family);
  font-size: var(--filters-font-size);
  color: var(--filters-font-color);
  letter-spacing: var(--filters-letter-spacing);
  @media (max-width: 650px) {
    display: block;
  }
`;

const SearchIconContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;
const SearchIcon = styled.div<{
  width?: number;
  height?: number;
  imgUrl: string;
}>`
  /* position: absolute; */
  background-image: ${(props) => `url("${props.imgUrl}")`};
  background-repeat: no-repeat;
  background-size: contain;
  /* top: 23px;
  left: 190px; */
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  /* height: 70%; */
  border-bottom: 1px solid var(--search-bar__border__color);
  /* border-radius: 5px; */

  height: var(--filter-px-height);
`;

const DropdownContainer = styled.div`
  margin-left: 30px;
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
        <SearchInputContainer>
          <SearchInput
            placeholder="Search Booka.."
            value={state.currentSearchBarText}
            onChange={handleSearchChange}
            onClick={(e) => handleClick(e)}
          />
          <SearchIconContainer>
            <SearchIcon imgUrl={IMAGES.searchIcon} />
          </SearchIconContainer>
        </SearchInputContainer>
        <DropdownContainer>
          <Dropdown
            menuItems={categoryItems}
            padding={'0px 15px'}
            border={'1px solid black'}
            title={'categories'}
            handleDropdownItemSelect={handleDropdownItemSelect}
          />
        </DropdownContainer>
      </SearchBarInputContainer>
    </div>
  );
}

export default SearchBar;
