import Navbar from '../../components/navbar/navbar';
import MainSections from '../../components/main-sections/main-sections';
import { useContext } from 'react';
import { Context } from '../../store/store';
import Footer from '../../components/footer/footer';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function Homepage() {
  const [state] = useContext(Context) as any;

  return (
    <Container>
      <Navbar loggedInUser={state?.loggedInUser} />
      <MainSections />
      <Footer />
    </Container>
  );
}

export default Homepage;
