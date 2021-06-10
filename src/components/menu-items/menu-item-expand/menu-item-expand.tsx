import MenuItem from '../menu-item/menu-item';
import Logout from '../../logout/logout';
import { IMAGES } from '../../../constants/image.constants';
import styled from 'styled-components';
import useComponentVisible from '../../../hooks/use-component-visible';
import Profile from '../../profile/profile';
import { SyntheticEvent } from 'react';
import { IUser } from '../../../types/user';

const MenuItemDropDownContainer = styled.div<{ ref: any }>`
  display: flex;
  justify-content: center;
  position: relative;
  margin-left: var(--menu-item-margin);
  margin-bottom: 15px;
  cursor: pointer;
`;
const Popup = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: center;
  position: absolute;
  /* top: 0px; */
  right: 0px;
  width: 130px;
  height: 100px;
  margin: 40px 0;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  /* box-shadow: 0 0 4px #666; */
  border: var(--border-light);
  background-color: var(--white);
  color: #161313;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s all;
  animation: fadein 0.3s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-left: 200px;
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
          <Logout />
        </Popup>
      }
    </MenuItemDropDownContainer>
  );
}

export default MenuItemExpand;
