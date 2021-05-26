import styled from 'styled-components';

const SearchBarInput = styled.input`
  border: none;
  background-color: var(--search-bar__bg);
  /* height: 70%; */
  height: 100%;
  padding: var(--filters-padding);
  font-family: var(--primary-font-family);
  font-size: var(--filters-font-size);
  font-weight: var(--filters-font-weight);
  color: var(--filters-font-color);
  letter-spacing: var(--filters-letter-spacing);
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--filters-font-color);
  }
  /* border: 1px solid var(--search-bar__border__color); */
`;

type Props = {
  onClick: (params: any) => any;
  onChange: (params: any) => any;
  value: string;
  placeholder: string;
};

function SearchInput({ onClick, onChange, value, placeholder }: Props) {
  return (
    <SearchBarInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={(e) => onClick(e)}
    />
  );
}

export default SearchInput;
