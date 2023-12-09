import { IconButton, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';

function Pagination({ currentPage, setCurrentPage, lastPage }) {
  const [active, setActive] = useState(currentPage);

  const next = () => {
    if (active === lastPage) return;
    setActive(active + 1);
    setCurrentPage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    setCurrentPage(active - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
      >
        <HiOutlineArrowLeft strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{active}</strong> of{' '}
        <strong className="text-gray-900">{lastPage}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === lastPage}
      >
        <HiOutlineArrowRight strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  lastPage: PropTypes.number,
};

export default Pagination;
