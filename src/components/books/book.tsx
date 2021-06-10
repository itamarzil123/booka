import { SyntheticEvent, useContext, useState } from 'react';
import styled from 'styled-components';
import { IMAGES } from '../../constants/image.constants';
import { Context } from '../../store/store';
import Modal from '../../widgets/modal/modal';
import { Document, Page } from 'react-pdf';
import { IBook } from '../../types/book';
import Rating from '../rating/rating';

const Container = styled.div`
  width: 290px;
  height: 450px;
  padding: 25px;
  margin: var(--book-margin) 80px;
  cursor: pointer;
  border: none;
  border: 1px solid #d8d2d2;
  border: 16px solid transparent;
  border-image: 104
    repeating-linear-gradient(
      -45deg,
      white 0,
      #ff9f9f 1em,
      transparent 0,
      transparent 2em,
      #000 0,
      #f00 3em,
      transparent 0,
      transparent 4em
    );
  @media (max-width: 650px) {
    width: 80%;
    height: 700px;
  }
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 200px;
  @media (max-width: 650px) {
    width: 80%;
    height: 700px;
  }
`;

const Image = styled.div<{
  width?: number;
  height?: number;
  imgUrl: string;
}>`
  background-image: ${(props) => `url("${props.imgUrl}")`};
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
`;

const WishlistIcon = styled.div<{
  width?: number;
  height?: number;
  imgUrl: string;
}>`
  background-image: ${(props) => `url("${props.imgUrl}")`};
  background-repeat: no-repeat;
  background-size: contain;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-left: 5px;
  margin-right: 25px;

  @media (max-width: 650px) {
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--primary-font-family);
  width: 100%;
  overflow: hidden;
`;
const Description = styled.div`
  padding: 5px;
`;
const Title = styled.div`
  font-family: var(--secondary-font-family);
  font-family: var(---third-font-family);
  font-family: var(--fifth-font-family);
  font-size: 16px;
  /* font-weight: 600; */
  /* letter-spacing: 0.1em; */
  margin-bottom: 5px;
`;

const Author = styled.div`
  font-size: 0.7em;
  font-weight: 600;
  color: #b36b6b;
`;

const ModalBookTitle = styled.div`
  display: flex;
  justify-content: center;
  font-family: var(--primary-font-family);
  font-size: 1.5em;
  margin-bottom: 35px;
  @media (max-width: 650px) {
    margin-bottom: 0px;
    font-size: 1em;
  }
`;

const ModalBookAuthor = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1em;
  margin-bottom: 35px;

  color: grey;
  @media (max-width: 650px) {
    margin-bottom: 0px;
  }
`;

const BookAbout = styled.div`
  margin-top: 50px;
  font-size: 1em;
  max-width: 500px;
  max-height: 70px;
  overflow: hidden;
  color: grey;
  @media (max-width: 650px) {
    margin-top: 10px;
  }
`;

const BookPreviewContent = styled.div``;

const ModalContentContainer = styled.div`
  display: flex;
  position: relative;
`;
const ModalContentDetails = styled.div`
  padding: 0px 50px;
`;

const BookPreviewButton = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;
  background-color: #fbf3f3;
  width: 300px;
  height: 50px;
  margin: 15px;
  cursor: pointer;
  @media (max-width: 650px) {
    width: 150px;
    height: 25px;
    font-size: 0.9em;
  }
`;

const AddToWishListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbf3f3;
  width: 300px;
  height: 50px;

  margin: 15px;
  cursor: pointer;
  @media (max-width: 650px) {
    width: 150px;
    height: 25px;
  }
`;

const BookAboutCaption = styled.div`
  font-weight: bold;
`;

const ModalButtons = styled.div`
  display: flex;
  position: absolute;
  top: 391px;
  right: 0;
  font-family: var(--primary-font-family);
  font-weight: 600;
  letter-spacing: 0.1em;
  font-size: 1em;
  @media (max-width: 650px) {
    top: 270px;
    font-size: 0.7em;
    font-family: var(--primary-font-family);
    font-weight: 600;
    letter-spacing: 0.1em;
  }
`;

const RatingContainer = styled.div<{ margin?: number; left?: any }>`
  display: flex;
  justify-content: ${(props) => (!props.left ? 'center' : 'flex-start')};
  margin-top: ${(props) => (props.margin ? `${props.margin}px` : null)};
`;

const BookKind = styled.div`
  margin-top: 5px;
`;
type Props = {
  book: IBook;
};

function Book({ book }: Props) {
  const [state, dispatch] = useContext<any>(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);
  const [bookPreviewUrl, setBookPreviewUrl] = useState(null);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const handleOpenModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const toggleWishlist = (e: SyntheticEvent, id: string) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: id });
  };

  // const handleBookPreview = (url: any) => {
  //   setBookPreviewUrl(url);
  // };

  const isInWishlist = state?.wishList.some(
    (bookItemId: string): boolean => bookItemId === book?.id
  );

  const titleWords = book?.volumeInfo?.title?.split(' ');
  const titleToRender = titleWords
    ? `${titleWords[0]} ${titleWords[1]} ${titleWords[2]} ${titleWords[3]} ${titleWords[4]}`
    : '';

  return (
    <>
      <Container key={book?.id} onClick={handleOpenModal}>
        <Image
          imgUrl={book?.volumeInfo?.imageLinks?.thumbnail}
          width={80}
          height={50}
        />
        <Details>
          <Description>
            <Title title={book?.volumeInfo?.title}>
              {' '}
              {book?.volumeInfo?.title}
            </Title>
            <Author>
              {' '}
              {book?.volumeInfo?.authors && book?.volumeInfo?.authors[0]}
            </Author>
            <BookKind>{book?.saleInfo?.saleability}</BookKind>
            <BookKind> {book?.saleInfo?.isEbook && 'Format: Ebook'}</BookKind>
            <BookKind></BookKind>
            <RatingContainer margin={30} left>
              <Rating rating={4} />
            </RatingContainer>
          </Description>
        </Details>
      </Container>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        width={1000}
        height={550}
      >
        <ModalContentContainer>
          <ImageContainer>
            <Image
              imgUrl={book?.volumeInfo?.imageLinks?.thumbnail}
              width={80}
              height={100}
            />
          </ImageContainer>
          <ModalContentDetails>
            <ModalBookTitle>{book?.volumeInfo?.title}</ModalBookTitle>
            <ModalBookAuthor>
              {' '}
              By {book?.volumeInfo?.authors && book?.volumeInfo?.authors[0]}
            </ModalBookAuthor>

            <RatingContainer>
              <Rating rating={4} />
            </RatingContainer>

            {book?.volumeInfo?.description && (
              <BookAbout title={book?.volumeInfo?.description}>
                <BookAboutCaption>Synopsis:</BookAboutCaption>
                {book?.volumeInfo?.description}
              </BookAbout>
            )}

            {bookPreviewUrl && (
              <BookPreviewContent>
                <Document
                  file={bookPreviewUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </BookPreviewContent>
            )}

            <div>{book?.volumeInfo?.publisherDate}</div>
            <ModalButtons>
              <BookPreviewButton>Book Preview</BookPreviewButton>

              <AddToWishListButton onClick={(e) => toggleWishlist(e, book?.id)}>
                {isInWishlist ? (
                  <WishlistIcon
                    imgUrl={IMAGES.wishlistIcon}
                    width={20}
                    height={20}
                  />
                ) : (
                  <WishlistIcon
                    imgUrl={IMAGES.notInWishListIcon}
                    width={20}
                    height={20}
                  />
                )}
                Add To Wish List
              </AddToWishListButton>
            </ModalButtons>
          </ModalContentDetails>
        </ModalContentContainer>
      </Modal>
    </>
  );
}

export default Book;
