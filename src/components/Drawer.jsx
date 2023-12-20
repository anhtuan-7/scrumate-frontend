import { IconButton, Drawer as MaterialDrawer } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

const Drawer = ({ open, handler, children }) => {
  const closeDrawer = () => handler(false);

  return (
    <MaterialDrawer
      placement="right"
      open={open}
      onClose={closeDrawer}
      className="rounded-lg"
      size={450}
    >
      <IconButton variant="text" color="blue" onClick={closeDrawer}>
        <IoArrowForwardCircleOutline className="text-xl" />
      </IconButton>
      <div className="h-full overflow-auto px-6 py-3">{children}</div>
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool,
  handler: PropTypes.func,
  children: PropTypes.any,
};

export default Drawer;
