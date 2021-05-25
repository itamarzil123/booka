import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 30px 0px;
  @media (max-width: 650px) {
    display: none;
  }
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
`;
const Line = styled.div`
  height: 1px;
  width: 600px;
  background-color: #b9b7b7;
`;

const Title = styled.div`
  left: 50%;
  margin: 0px 30px;
  font-size: 1.7em;
  font-family: var(--primary-font-family);
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: 0.05em;
`;

type Props = {
  title: string;
};
function Separator({ title }: Props) {
  return (
    <Container>
      <LineContainer>
        <Line />
      </LineContainer>
      <Title>{title}</Title>
      <LineContainer>
        <Line />
      </LineContainer>
    </Container>
  );
}

export default Separator;
