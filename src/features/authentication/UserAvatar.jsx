import {
  Button,
  Avatar as MaterialAvatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { HiOutlineChevronDown, HiOutlinePower, HiUser } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Toast from '../../components/Toast';
import { useLogoutMutation } from './authApi';
import { doLogout } from './statusSlice';

const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const [logout, { isSuccess, error }] = useLogoutMutation();
  const handleLogout = () => logout();
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.removeItem('user');
      dispatch(doLogout());
      Toast.fire({
        title: 'Logout Successfully',
        icon: 'success',
        timer: '2000',
      });
    }
  }, [isSuccess, navigate, dispatch]);

  if (error) {
    console.log(error);
    Toast.fire({
      icon: 'error',
      title: error.data ? `${error.data.message}` : 'Service Unavailable',
    });
  }

  return (
    <div className="flex items-center gap-3">
      <Typography className="text-blue-gray-900">
        Hello, {user.name.split(' ')[0]}
      </Typography>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2 lg:ml-auto"
          >
            <MaterialAvatar
              variant="circular"
              size="md"
              alt="avatar"
              className="border border-blue-500"
              src="/profile/profile-1.png"
            />
            <HiOutlineChevronDown
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          <MenuItem
            className="flex items-center gap-2 rounded "
            onClick={closeMenu}
          >
            <HiUser className="h-4 w-4" />
            <Typography as="span" variant="small">
              Profile
            </Typography>
          </MenuItem>
          <MenuItem
            className="flex items-center gap-2 rounded"
            onClick={handleLogout}
          >
            <HiOutlinePower className="h-4 w-4 text-red-500" />
            <Typography as="span" variant="small" className="text-red-500">
              Logout
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Avatar;
