import styled from 'styled-components';

type Props = {
  title: string;
  items: any[];
  handleDropdownItemSelect: (params: any) => any;
};

const Container = styled.div`
  margin-bottom: 25px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  height: 50px;
  margin-bottom: 10px;
  padding: 0px 15px;
  text-transform: uppercase;
  font-family: var(--primary-font-family);
  background-color: #d1a7ac;
  letter-spacing: 0.05em;
`;

const Item = styled.div`
  font-family: var(--primary-font-family);
  margin-bottom: 10px;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-size: 0.8em;
  text-transform: capitalize;
  cursor: pointer;
  user-select: none;
`;
function FlatFilter({ title, items, handleDropdownItemSelect }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <div>
        {items.map((item) => (
          <Item
            key={item.id}
            onClick={() => handleDropdownItemSelect(item.title)}
          >
            {item.title}
          </Item>
        ))}
      </div>
    </Container>
  );
}

export default FlatFilter;
