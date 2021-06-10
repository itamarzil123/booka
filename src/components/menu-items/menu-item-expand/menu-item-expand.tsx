import MenuItem from '../menu-item/menu-item';
import Logout from '../../logout/logout';
import { IMAGES } from '../../../constants/image.constants';
import styled from 'styled-components';
import useComponentVisible from '../../../hooks/use-component-visible';
import Profile from '../../profile/profile';
import { SyntheticEvent } from 'react';
import { IUser } from '../../../types/user';
import Popup from '../../popup/popup';

const MenuItemDropDownContainer = styled.div<{ ref: any }>`
  display: flex;
  justify-content: center;
  position: relative;
  margin-left: var(--menu-item-margin);
  margin-bottom: 15px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-left: 200px;
`;

const PopupItemContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin: 10px 5px; */
  /* margin-left: 10px; */
  height: 40px;
  width: 100%;
  &:hover {
    background-color: var(--light-grey);
  }
  cursor: pointer;
`;
const PopupItem = styled.div`
  /* width: 100%; */
  margin-left: 10px;
  font-size: var(--small-text);
  font-family: var(--primary-font-family);
  font-family: var(--fourth-font-family);
  font-weight: 600;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  &:hover {
    color: #ad8a90;
  }
`;

type Props = {
  setSelectedItem: any;
  loggedInUser?: IUser | undefined;
};

function MenuItemExpand({ setSelectedItem, loggedInUser }: Props) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  const onClick = (e: SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsComponentVisible((show: boolean) => !show);
  };

  return (
    <MenuItemDropDownContainer ref={ref} onClick={onClick}>
      <ProfileContainer>
        <Profile
          username={loggedInUser?.username}
          userImage={loggedInUser?.image}
          isEditable={false}
          width={30}
          height={40}
        />
        <MenuItem
          withUnderline={false}
          icon={IMAGES.moreIcon}
          transform={180}
          setSelectedItem={setSelectedItem}
          width={8}
          height={8}
          isAbsolute={false}
          top={20}
          right={-13}
        />
      </ProfileContainer>

      {
        <Popup show={isComponentVisible}>
          <PopupItemContainer>
            <PopupItem onClick={() => {}}>My Account</PopupItem>
          </PopupItemContainer>
          <PopupItemContainer>
            <PopupItem onClick={() => {}}>My Orders</PopupItem>
          </PopupItemContainer>
          <PopupItemContainer>
            <PopupItem onClick={() => {}}>
              <Logout />
            </PopupItem>
          </PopupItemContainer>
        </Popup>
      }
    </MenuItemDropDownContainer>
  );
}

export default MenuItemExpand;
