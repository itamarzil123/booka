import styled from 'styled-components';
import './modal.css';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation: fadein 0.3s;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled.div<{ width?: number; height?: number }>`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 30%;
  width: ${(props) => (props.width ? `${props.width}px` : '60%')};
  height: ${(props) => (props.height ? `${props.height}px` : null)};
  background-color: white;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  z-index: 101;
  padding: 40px;
  /* animation: fadein 0.5s; */
  /* transition: all ease 1s; */
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @media (max-width: 650px) {
    width: 450px;
    height: 350px;
    padding: 10px;
    overflow-y: hidden;
  }
`;

type Props = {
  children?: any;
  width?: number;
  height?: number;
  isModalOpen?: boolean;
  setIsModalOpen: (params: any) => any;
};

function Modal({
  children,
  isModalOpen,
  setIsModalOpen,
  width,
  height
}: Props) {
  if (isModalOpen) {
    return (
      <ModalContainer>
        {
          <ModalBox width={width} height={height}>
            {' '}
            {children}
          </ModalBox>
        }
        <ModalBackdrop onClick={() => setIsModalOpen(false)}></ModalBackdrop>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
