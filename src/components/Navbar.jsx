import { Navbar as MaterialNavbar } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import UserAvatar from '../features/authentication/UserAvatar';
import NavUtil from './NavUtil';

const Navbar = () => {
  const { user } = useSelector((state) => state.currentUser);

  return (
    <MaterialNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none border-b border-gray-300 px-10 py-4 shadow-none">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <img src="/hires-logo.png" className="w-40" />
        </Link>
        {user ? <UserAvatar user={user} /> : <NavUtil />}
      </div>
    </MaterialNavbar>
  );
};

export default Navbar;
