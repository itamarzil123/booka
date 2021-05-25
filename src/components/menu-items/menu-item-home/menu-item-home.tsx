import MenuItem from '../menu-item/menu-item';
import { IMAGES } from '../../../constants/image.constants';

type Props = {
  selected: any;
  setSelectedItem: any;
};
function MenuItemHome({ selected, setSelectedItem }: Props) {
  return (
    <MenuItem
      title="Home"
      icon={IMAGES.homeUnselectedIcon}
      selected={selected}
      setSelectedItem={setSelectedItem}
    />
  );
}

export default MenuItemHome;
