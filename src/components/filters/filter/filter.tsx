import styled from 'styled-components';
import Dropdown from '../../dropdown/dropdown';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
  margin-top: 115px;
`;

const Title = styled.div`
  font-family: var(--primary-font-family);
  font-size: var(--filters-font-size);
  font-weight: var(--filters-font-weight);
  margin-bottom: 5px;
`;

type Props = {
  title: string;
  handleDropdownItemSelect: (params: any) => any;
  items: any[];
};

function Filter({ title, handleDropdownItemSelect, items }: Props) {
  return (
    <Container>
      <Title> {title} </Title>
      <Dropdown
        menuItems={items}
        bgColor={'white'}
        border={'1px solid black'}
        width={200}
        title={'sort types'}
        handleDropdownItemSelect={handleDropdownItemSelect}
      />
    </Container>
  );
}

export default Filter;
