import SearchBar from '../searchbar/searchbar';
import MenuItems from '../menu-items/menu-items';
import styled from 'styled-components';
import Logo from '../logo/logo';
import { IMAGES } from '../../constants/image.constants';
import { IUser } from '../../types/user';
import Hamburger from '../hamburger/hamburger';
import { useState } from 'react';

const Container = styled.div`
  height: 7%;
  display: flex;
  justify-content: space-between;
  background-color: var(--box-bg);
  border: none;
  border-bottom: var(--box-border__size) solid var(--box-border__color);
  @media (max-width: 650px) {
    /* display: none; */
  }
`;

const ResponsiveContainer = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  background-color: var(--box-bg);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: center;
`;

const ResponsiveItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ResponsiveItem = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
  font-family: var(--primary-font-family);
  font-size: 1.5em;
  cursor: pointer;
`;

const NavbarLeft = styled.div`
  display: flex;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmenuContainer = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  background-color: var(--box-bg);
  border: none;
  border-bottom: var(--box-border__size) solid var(--box-border__color);
  background-color: var(--light-pink);

  @media (max-width: 650px) {
    /* display: none; */
  }
`;

const Submenu = styled.div`
  display: flex;
  align-items: center;
`;
const SubmenuItem = styled.div<{ isSelected: boolean }>`
  font-family: var(--secondary-font-family);
  font-family: var(--primary-font-family);
  font-size: 1em;
  font-weight: ${(props) => (props.isSelected ? '600' : '400')};
  color: black;
  cursor: pointer;
  letter-spacing: var(--menu-item-letter-spacing);
  text-transform: capitalize;
  margin: 0px 15px;
  padding: 5px;
  border: none;

  &:hover {
    border-bottom: 1px solid var(--grey);
  }
`;

type Props = {
  loggedInUser: IUser;
};

function Navbar({ loggedInUser }: Props) {
  const [hamburgerSelected, setHamburgerSelected] = useState(false);

  return (
    <>
      <Container>
        <Hamburger
          hamburgerSelected={hamburgerSelected}
          setHamburgerSelected={setHamburgerSelected}
        />

        <NavbarLeft>
          <LogoContainer>
            <Logo
              width={160}
              height={50}
              marginBottom={10}
              marginLeft={0}
              text={''}
              imgUrl={IMAGES.logoWithoutDescription}
            />
          </LogoContainer>

          <SearchBar loggedInUser={loggedInUser} />
        </NavbarLeft>

        <MenuItems
          loggedInUser={loggedInUser}
          hamburgerSelected={hamburgerSelected}
        />
      </Container>
      <SubmenuContainer>
        <Hamburger
          hamburgerSelected={hamburgerSelected}
          setHamburgerSelected={setHamburgerSelected}
        />
        <Submenu>
          <SubmenuItem isSelected={false}>local delivery</SubmenuItem>
          <SubmenuItem isSelected={false}>customer service</SubmenuItem>
          <SubmenuItem isSelected={false}>products</SubmenuItem>
          <SubmenuItem isSelected={false}>solutions</SubmenuItem>
          <SubmenuItem isSelected={false}></SubmenuItem>
        </Submenu>
        <NavbarLeft></NavbarLeft>
      </SubmenuContainer>
      <ResponsiveContainer show={hamburgerSelected}>
        <ResponsiveItems>
          <ResponsiveItem>menu item</ResponsiveItem>
          <ResponsiveItem>menu item</ResponsiveItem>
          <ResponsiveItem>menu item</ResponsiveItem>
        </ResponsiveItems>
      </ResponsiveContainer>
    </>
  );
}

export default Navbar;
