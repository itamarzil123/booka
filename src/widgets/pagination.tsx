import { SyntheticEvent } from 'react';
import styled from 'styled-components';

type Props = {
  activePage: number;
  itemsPerPage: number;
  totalPages: number | null;
  handlePageSelect: any;
};

const Pages = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  font-family: var(--primary-font-family);
  font-size: 0.8em;
`;

const Page = styled.div<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #d19898;
  transition: 0.3s all;
  background-color: ${(props) => (props.isActive ? '#d19898' : 'white')};

  &:hover {
    background-color: #d19898;
  }
  user-select: none;
`;

const PrevNext = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 25px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid #d19898;
  transition: 0.3s all;

  &:hover {
    background-color: #d19898;
  }
  user-select: none;
`;

function Pagination({
  activePage,
  itemsPerPage,
  handlePageSelect,
  totalPages
}: Props) {
  const renderPages = () => {
    if (totalPages) {
      return (
        <>
          {new Array(totalPages).fill(0).map((elem, i) => (
            <Page
              key={i}
              onClick={(e: SyntheticEvent) => handlePageSelect(i + 1)}
              isActive={activePage === i + 1}
            >
              {i + 1}
            </Page>
          ))}
        </>
      );
    } else if (!totalPages) {
      return (
        <>
          {/* <Page
            onClick={(e: SyntheticEvent) => handlePageSelect(1)}
            isActive={activePage === 1}
          >
            {1}
          </Page>
          <Page>{'...'}</Page>
          <Page
            onClick={(e: SyntheticEvent) => handlePageSelect(activePage - 1)}
            isActive={false}
          >
            {activePage - 1}
          </Page> */}
          <Page onClick={(e: SyntheticEvent) => {}} isActive={true}>
            {activePage}
          </Page>
          <Page>{'...'}</Page>
          {/* <Page
            onClick={(e: SyntheticEvent) => handlePageSelect(activePage + 1)}
            isActive={false}
          >
            {activePage + 1}
          </Page> */}
        </>
      );
    }
  };
  return (
    <Pages>
      <PrevNext
        onClick={(e: SyntheticEvent) => handlePageSelect(activePage - 1)}
      >
        Prev
      </PrevNext>
      {renderPages()}
      <PrevNext
        onClick={(e: SyntheticEvent) => handlePageSelect(activePage + 1)}
      >
        Next
      </PrevNext>
    </Pages>
  );
}

export default Pagination;
