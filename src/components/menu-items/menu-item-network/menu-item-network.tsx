import MenuItem from '../menu-item/menu-item';
import { IMAGES } from '../../../constants/image.constants';

type Props = {
  selected: any;
  setSelectedItem: any;
};

function MenuItemHome({ selected, setSelectedItem }: Props) {
  return (
    <MenuItem
      title="Network"
      icon={IMAGES.networkIcon}
      selected={selected}
      setSelectedItem={setSelectedItem}
    />
  );
}

export default MenuItemHome;
