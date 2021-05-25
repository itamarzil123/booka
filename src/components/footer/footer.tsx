import styled from 'styled-components';
import FooterItem from '../footer/footer-item/footer-item';

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: var(--footer-bg);
`;
const FooterSectionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 150px;
  font-family: var(--primary-font-family);
`;

const FooterSection = styled.div`
  width: 80%;
`;

const FooterSectionTitle = styled.div`
  font-size: 1.2em;
  text-transform: uppercase;
  color: #000000;
  font-weight: 600;
  margin-bottom: 15px;
  @media (max-width: 650px) {
    font-size: 0.7em;
  }
`;
const Footer = () => {
  return (
    <Container>
      <FooterSectionContainer>
        <FooterSection>
          <FooterSectionTitle>about booka</FooterSectionTitle>
          <FooterItem title="about" />
          <FooterItem title="history" />
          <FooterItem title="careers" />
        </FooterSection>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <FooterSection>
          <FooterSectionTitle>customer service</FooterSectionTitle>
          <FooterItem title="contact us" />
          <FooterItem title="conditions of use" />
        </FooterSection>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <FooterSection>
          <FooterSectionTitle>membership</FooterSectionTitle>
          <FooterItem title="subscription" />
        </FooterSection>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <FooterSection>
          <FooterSectionTitle>community</FooterSectionTitle>
          <FooterItem title="world books" />
          <FooterItem title="used books" />
          <FooterItem title="donations" />
        </FooterSection>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <FooterSection>
          <FooterSectionTitle>follow us</FooterSectionTitle>
          <FooterItem title="twitter" />
          <FooterItem title="facebook" />
          <FooterItem title="instagram" />
          <FooterItem title="youtube" />
        </FooterSection>
      </FooterSectionContainer>
    </Container>
  );
};
export default Footer;
