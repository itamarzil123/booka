import React from 'react';
import Box from '../box/box';

type Props = {
  children?: React.ReactNode;
  height?: number;
  width?: number;
};

function SectionBox({ children, height, width }: Props) {
  return (
    <Box height={70} width={width}>
      {children}
    </Box>
  );
}

export default SectionBox;
