import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';

function ExpandablePanel({ header, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border-2 border-blue-200">
      <div className="flex items-center justify-between p-2">
        {header}
        <div className="cursor-pointer pr-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {isOpen && <div className="border-t border-blue-100 p-2">{children}</div>}
    </div>
  );
}

ExpandablePanel.propTypes = {
  header: PropTypes.object,
  children: PropTypes.any,
  defaultOpen: PropTypes.bool,
};

export default ExpandablePanel;
