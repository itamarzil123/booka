import styled from 'styled-components';

const SearchBarInput = styled.input`
  border: none;
  border-radius: 5px;
  background-color: var(--search-bar__bg);
  padding: 12px 25px;
  height: 100%;
  font-size: 0.9em;
  letter-spacing: 1px;
  outline: none;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--search-bar__color);
  }
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
