import styled, { css } from 'styled-components';
import './menu-item.css';

const MenuItemContainer = styled.div<{
  onClick(e?: any): any;
  withUnderline?: boolean;
  isSelected?: boolean;
}>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0px var(--menu-item-margin);
  ${({ withUnderline }) =>
    withUnderline &&
    css`
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.05em;
        background-color: #000000;
        transition: transform 400ms;
        opacity: 1;
        transform: scale(0);
      }
    `}
`;

const MenuItemIcon = styled.div<{
  icon: any;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  isAbsolute?: boolean;
  marginLeft?: number;
  transform: any;
  isSelected?: boolean;
}>`
  ${({ isAbsolute }) =>
    isAbsolute &&
    css`
      position: absolute;
    `}
  left: ${(props) => (props.left ? `${props.left}px` : null)};
  right: ${(props) => (props.right ? `${props.right}px` : '')};

  top: ${(props) => (props.top ? `${props.top}px` : '0px')};
  background-image: ${(props) => `url(${props.icon})`};
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => (props.width ? `${props.width}px` : '20px')};
  height: ${(props) => (props.height ? `${props.height}px` : '20px')};
  transform: ${(props) => props.transform && `rotate(${props.transform}deg)`};
  margin-left: ${(props) => props.marginLeft}px;
  filter: ${(props) =>
    props.isSelected
      ? 'invert(0%) sepia(97%) saturate(0%) hue-rotate(47deg) brightness(99%) contrast(103%);'
      : 'invert(29%) sepia(4%) saturate(16%) hue-rotate(18deg) brightness(96%) contrast(89%);'};

  /* &:hover {
    filter: invert(0%) sepia(97%) saturate(0%) hue-rotate(47deg) brightness(99%)
      contrast(103%);
  } */
`;
const MenuItemTitle = styled.div<{ isSelected: boolean }>`
  font-family: var(--secondary-font-family);
  font-family: var(--primary-font-family);
  font-size: var(--menu-item-font-size);
  font-weight: ${(props) => (props.isSelected ? '600' : '400')};
  color: black;
  cursor: pointer;
  letter-spacing: var(--menu-item-letter-spacing);
  text-transform: capitalize;
  /* &:hover {
    font-weight: 600;
  } */
`;

type Props = {
  title?: string;
  icon?: any;
  width?: number;
  height?: number;
  transform?: number;
  marginLeft?: number;
  onClick?(e?: any): any;
  selected?: any;
  setSelectedItem: any;
  withUnderline?: boolean;
  isAbsolute?: boolean;
  top?: number;
  right?: number;
  children?: any;
  handleClick?(e?: any): any;
};

function MenuItem({
  title,
  icon,
  width,
  height,
  isAbsolute,
  top,
  right,
  transform,
  marginLeft,
  onClick,
  selected,
  setSelectedItem,
  withUnderline,
  children,
  handleClick = () => {}
}: Props) {
  const handleOnClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
    setSelectedItem(title);
    handleClick(title);
  };
  return (
    <MenuItemContainer
      onClick={handleOnClick}
      withUnderline={withUnderline}
      isSelected={selected}
    >
      {icon && (
        <MenuItemIcon
          isSelected={selected}
          icon={icon}
          width={width}
          height={height}
          isAbsolute={isAbsolute}
          top={top}
          right={right}
          transform={transform}
          marginLeft={marginLeft}
        ></MenuItemIcon>
      )}
      <MenuItemTitle isSelected={selected}>{title}</MenuItemTitle>
      {children}
    </MenuItemContainer>
  );
}

export default MenuItem;
