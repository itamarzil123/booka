import React from 'react';
import styled from 'styled-components';
import './box.css';

const BoxContainer = styled.div<{
  height?: number;
  width?: number;
  marginBottom?: number;
}>`
  display: flex;
  height: ${(props) => props.height}%;
  width: ${(props) => props.width}%;
  margin-bottom: ${(props) => props.marginBottom}px;
`;
type Props = {
  children?: React.ReactNode;
  height?: number;
  width?: number;
  marginBottom?: number;
};
function Box({ children, height, width, marginBottom }: Props) {
  return (
    <BoxContainer
      className="box-container"
      height={height}
      width={width}
      marginBottom={marginBottom}
    >
      {children}
    </BoxContainer>
  );
}

export default Box;
