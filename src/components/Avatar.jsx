import { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar as MaterialAvatar,
  Button,
  MenuHandler,
  Menu,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { HiOutlineChevronDown, HiOutlinePower, HiUser } from "react-icons/hi2";
import { logout } from "../store";
import useThunk from "../hooks/useThunk";

const Avatar = ({ user }) => {
  const [doLogout, isLoading, error] = useThunk(logout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    doLogout();
  };

  return (
    <div className="flex items-center gap-3">
      <Typography className="text-blue-gray-900">
        Hello, {user.name.split(" ")[0]}
      </Typography>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
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
                isMenuOpen ? "rotate-180" : ""
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

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Avatar;
