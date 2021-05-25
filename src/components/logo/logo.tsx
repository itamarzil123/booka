import styled from 'styled-components';
import { IMAGES } from '../../constants/image.constants';
import './logo.css';

type Props = {
  width: number;
  height: number;
  marginBottom?: number;
  marginLeft?: number;
  text?: string;
  subtext?: string;
  children?: any;
  imgUrl?: string;
};

const LogoContainer = styled.div<{
  marginBottom?: number;
  marginLeft?: number;
}>`
  margin-bottom: ${(props) => props.marginBottom}px;
  margin-left: ${(props) => props.marginLeft}%;
`;
const LogoImage = styled.div<{
  width?: number;
  height?: number;
  imgUrl: string;
}>`
  background-image: ${(props) => `url("${props.imgUrl}")`};
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

function Logo({
  width,
  height,
  marginBottom,
  marginLeft,
  text,
  subtext,
  imgUrl
}: Props) {
  return (
    <LogoContainer marginBottom={marginBottom} marginLeft={marginLeft}>
      <div className="logo-image__container">
        <LogoImage
          width={width}
          height={height}
          imgUrl={imgUrl ? imgUrl : IMAGES.logo}
        ></LogoImage>
      </div>
      {text ? <div className="logo-description">{text}</div> : <div />}
      {subtext ? <div className="logo-subdescription">{subtext}</div> : <div />}
    </LogoContainer>
  );
}

export default Logo;
