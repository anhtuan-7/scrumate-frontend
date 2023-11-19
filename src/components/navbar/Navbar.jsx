import { Navbar as MaterialNavbar } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

import NavUtil from './NavUtil';

const Navbar = () => {
  return (
    <MaterialNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none border-b border-gray-300 px-10 py-4 shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <img src="/hires-logo.png" className="w-40" />
        </Link>
        <NavUtil />
      </div>
    </MaterialNavbar>
  );
};

export default Navbar;
