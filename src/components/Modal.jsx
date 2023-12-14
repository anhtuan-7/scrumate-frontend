import { Dialog } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const Modal = ({ children, actionBar, open, handler }) => {
  return (
    <Dialog
      open={open}
      handler={handler}
      size="sm"
      className="lg:rounded-xlg fixed inset-y-0 lg:inset-y-20"
    >
      <div className="h-full p-2">
        <div className="flex h-full flex-col justify-between overflow-y-auto p-8">
          {children}
          <div className="mt-3 flex justify-end">{actionBar}</div>
        </div>
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  actionBar: PropTypes.any,
  open: PropTypes.bool,
  handler: PropTypes.func,
};

export default Modal;
