import styled from 'styled-components';

const FooterItemContainer = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 0.8em;
  margin-bottom: 10px;
  cursor: pointer;
`;
const FooterItem = ({ title }: { title: string }) => {
  return <FooterItemContainer>{title}</FooterItemContainer>;
};
export default FooterItem;
