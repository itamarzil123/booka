import { useState } from 'react';
import styled from 'styled-components';
import { IMAGES } from '../../constants/image.constants';
import useComponentVisible from '../../hooks/use-component-visible';

const Container = styled.div<{
  isFocused?: boolean;
  ref?: any;
  padding?: string;
  width?: number;
}>`
  display: flex;
  position: relative;
  width: ${(props) => (props.width ? `${props.width}px` : '200px')};
  padding: ${(props) => (props.padding ? props.padding : null)};
  ${(props) => props.isFocused && 'box-shadow: #d6d6d6 0px 5px 5px 0px;'};
  z-index: 100;
  user-select: none;
  color: var(--search-bar__color);
  font-weight: 600;
  font-family: var(--primary-font-family);
  @media (max-width: 650px) {
    display: none;
  }
`;

const Dropdown_ = styled.div<{ bgColor?: string; border?: string }>`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: var(--search-bar__bg);
  background-color: ${(props) => (props.bgColor ? props.bgColor : null)};
  border: ${(props) => (props.border ? props.border : null)};
  position: absolute;
  padding: 12px 25px;
  font-size: 0.9em;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
  color: var(--search-bar__color);
`;

const DropdownItems = styled.div<{ show: boolean; border?: string }>`
  width: 100%;
  margin-top: 10px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  border: ${(props) => (props.border ? props.border : null)};
`;

const DropdownItem = styled.div<{ bgColor?: string }>`
  width: 83%;
  background-color: var(--search-bar__bg);
  background-color: ${(props) => (props.bgColor ? props.bgColor : null)};
  font-size: 0.9em;
  padding: 12px 0px;
  text-transform: capitalize;
  cursor: pointer;
`;

const Title = styled.div`
  text-transform: capitalize;
`;

const Icon = styled.div<{ show: boolean }>`
  position: absolute;
  transition: 0.3s all;
  transform: ${(props) => (props.show ? 'rotate(180deg)' : 'rotate(0deg)')};
  background-image: url(${IMAGES.chevronIcon});
  background-repeat: no-repeat;
  background-size: contain;
  top: 13px;
  left: 85%;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

type Props = {
  menuItems: any[];
  bgColor?: string;
  padding?: string;
  border?: string;
  width?: number;
  title: string;
  handleDropdownItemSelect: (params: any) => any;
};
function Dropdown({
  menuItems,
  bgColor,
  padding,
  border,
  width,
  title,
  handleDropdownItemSelect
}: Props) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  const [selectedItem, setSelectedItem] = useState(title);
  const handleToggleDropdown = (e: any) => {
    setIsComponentVisible((visible: any) => !visible);
  };

  const handleDropdownItemClick = (e: any, item: any) => {
    if (item.title === 'all') {
      setSelectedItem(title);
    } else {
      setSelectedItem(item.title);
    }
    e.stopPropagation();
    handleDropdownItemSelect(item.title);
    setIsComponentVisible((visible: any) => !visible);
  };

  return (
    <Container
      onClick={handleToggleDropdown}
      padding={padding}
      width={width}
      ref={ref}
    >
      <Dropdown_ bgColor={bgColor} border={border}>
        {' '}
        {selectedItem ? <Title>{selectedItem}</Title> : <Title>{title}</Title>}
        <DropdownItems show={isComponentVisible}>
          {menuItems.map(
            (item) =>
              item.title !== selectedItem && (
                <DropdownItem
                  key={item.id}
                  bgColor={bgColor}
                  onClick={(e) => handleDropdownItemClick(e, item)}
                >
                  {item.title}
                </DropdownItem>
              )
          )}
          <DropdownItem
            bgColor={bgColor}
            onClick={(e) => handleDropdownItemClick(e, { title: 'all' })}
          >
            {'all'}
          </DropdownItem>
        </DropdownItems>
      </Dropdown_>
      <Icon show={isComponentVisible} />
    </Container>
  );
}

export default Dropdown;
