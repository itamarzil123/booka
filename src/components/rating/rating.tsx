import styled from 'styled-components';
import { IMAGES } from '../../constants/image.constants';

const Container = styled.div`
  display: flex;
`;

const RatingIcon = styled.div<{
  width: number;
  height: number;
  imgUrl: string;
}>`
  background-image: ${(props) => `url("${props.imgUrl}")`};
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-left: 5px;
`;

type Props = {
  rating: number;
};

function Rating({ rating }: Props) {
  return (
    <Container>
      {new Array(rating).fill(0).map((rating: any, i: number) => (
        <div key={i}>
          {' '}
          <RatingIcon
            imgUrl={IMAGES.starFilledIcon}
            width={20}
            height={20}
          />{' '}
        </div>
      ))}
      {new Array(5 - rating).fill(0).map((rating: any, i: number) => (
        <div key={i}>
          {' '}
          <RatingIcon
            imgUrl={IMAGES.starEmptyIcon}
            width={20}
            height={20}
          />{' '}
        </div>
      ))}
    </Container>
  );
}

export default Rating;
