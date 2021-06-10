import styled from 'styled-components';

const PopupContainer = styled.div<{ show: boolean }>`
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 5px;
  top: 57px;
  width: 160px;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  /* box-shadow: 0 0 4px #666; */
  border: var(--border-light);
  background-color: var(--white);
  box-shadow: 0 0 10px #666;
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  border-radius: 5px;
  color: #161313;
  flex-direction: column;
  transition: 0.2s all;
  animation: fadein 0.3s;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
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
  children: any;
  show: boolean;
};
function Popup({ children, show }: Props) {
  return <PopupContainer show={show}>{children}</PopupContainer>;
}

export default Popup;
