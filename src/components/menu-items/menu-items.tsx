import { useContext, useState } from 'react';
import MenuItem from './menu-item/menu-item';
import styled, { css } from 'styled-components';
import MenuItemExpand from './menu-item-expand/menu-item-expand';
import { IMAGES } from '../../constants/image.constants';
import { Context } from '../../store/store';
import { IUser } from '../../types/user';
import { ViewMods } from '../../constants/view.constants';

const ItemsContainer = styled.div<{ hamburgerSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  @media (max-width: 650px) {
    display: ${(props) => (props.hamburgerSelected ? 'none' : 'none')};
    flex-direction: ${(props) => (props.hamburgerSelected ? 'column' : 'row')};
  }
`;

const WishlistAmount = styled.div`
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  width: 17px;
  height: 16px;
  background-color: var(--pink);
  border-radius: 50%;
  top: 38px;
  right: -18px;
  font-size: 0.5em;
`;

type Props = {
  loggedInUser?: IUser;
  hamburgerSelected: boolean;
};

function MenuItems({ loggedInUser, hamburgerSelected }: Props) {
  const [selectedItem, setSelectedItem] = useState('home');
  const [state, dispatch] = useContext<any>(Context);
  const handleClickFavorites = (item: any) => {
    dispatch({ type: 'SET_VIEW_MOD', payload: ViewMods.WISH_LIST });
  };
  const handleClickHome = (item: any) => {
    dispatch({ type: 'SET_VIEW_MOD', payload: ViewMods.STANDARD });
  };
  return (
    <>
      <ItemsContainer hamburgerSelected={hamburgerSelected}>
        <MenuItem
          title="home"
          icon={IMAGES.homeIcon}
          width={40}
          height={40}
          selected={selectedItem === 'home'}
          setSelectedItem={setSelectedItem}
          withUnderline={true}
          handleClick={handleClickHome}
        />
        <MenuItem
          title="wishlist"
          width={40}
          height={40}
          icon={IMAGES.wishlistIcon}
          selected={selectedItem === 'wishlist'}
          setSelectedItem={setSelectedItem}
          withUnderline={true}
          handleClick={handleClickFavorites}
        >
          {/* <WishlistAmount>{state.wishList?.length}</WishlistAmount> */}
        </MenuItem>

        <MenuItem
          title="notifications"
          width={40}
          height={40}
          icon={IMAGES.notificationsIcon}
          selected={selectedItem === 'notifications'}
          setSelectedItem={setSelectedItem}
          withUnderline={true}
        />

        <MenuItemExpand
          setSelectedItem={setSelectedItem}
          loggedInUser={loggedInUser}
        />
      </ItemsContainer>
    </>
  );
}

export default MenuItems;
