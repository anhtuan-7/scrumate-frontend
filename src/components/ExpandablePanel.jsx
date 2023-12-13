import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function ExpandablePanel({ header, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 rounded-lg border-2 border-blue-100">
      <div className="flex items-center justify-between p-3">
        {header}
        <div className="cursor-pointer pr-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {isOpen && <div className="border-t border-blue-100 p-3">{children}</div>}
    </div>
  );
}

ExpandablePanel.propTypes = {
  header: PropTypes.object,
  children: PropTypes.any,
};

export default ExpandablePanel;
