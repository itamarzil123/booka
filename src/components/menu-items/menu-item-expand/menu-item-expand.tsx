import MenuItem from '../menu-item/menu-item';
import Logout from '../../logout/logout';
import { IMAGES } from '../../../constants/image.constants';
import styled from 'styled-components';
import useComponentVisible from '../../../hooks/use-component-visible';
import Profile from '../../profile/profile';
import { SyntheticEvent } from 'react';
import { IUser } from '../../../types/user';

const MenuItemDropDownContainer = styled.div<{ ref: any }>`
  position: relative;
  margin-left: 20px;
  margin-bottom: 15px;
`;
const Popup = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: center;
  position: absolute;
  /* top: 0px; */
  right: 0px;
  width: 130px;
  height: 100px;
  margin: 10px 0;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  box-shadow: 0 0 4px #666;
  background-color: #b29c9c;
  color: #161313;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s all;
  animation: fadein 1s;
  z-index: 100;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
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
      <Profile
        username={loggedInUser?.username}
        userImage={loggedInUser?.image}
        isEditable={false}
        profilePhotoSize={40}
      />
      <MenuItem
        withUnderline={false}
        icon={IMAGES.moreIcon}
        transform={180}
        setSelectedItem={setSelectedItem}
        width={8}
        height={8}
        isAbsolute={true}
        top={-11}
      />
      {
        <Popup show={isComponentVisible}>
          <Logout />
        </Popup>
      }
    </MenuItemDropDownContainer>
  );
}

export default MenuItemExpand;
