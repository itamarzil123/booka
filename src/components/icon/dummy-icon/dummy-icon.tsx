import styled, { css } from 'styled-components';
import { IMAGES } from '../../../constants/image.constants';

const MenuItemIcon = styled.div<{
  icon: any;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  right?: number;
  isAbsolute?: boolean;
  marginLeft?: number;
  transform?: any;
  isSelected?: boolean;
}>`
  ${({ isAbsolute }) =>
    isAbsolute &&
    css`
      position: absolute;
    `}
  left: ${(props) => (props.left ? `${props.left}px` : null)};
  right: ${(props) => (props.right ? `${props.right}px` : '0px')};

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
type Props = {
  width: number;
  height: number;
};
function DummyIcon({ width, height }: Props) {
  return (
    <MenuItemIcon icon={IMAGES.avatarIcon} width={width} height={height} />
  );
}

export default DummyIcon;
