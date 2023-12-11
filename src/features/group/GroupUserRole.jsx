import { Chip, IconButton, Option, Select } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosCheckmark, IoMdClose } from 'react-icons/io';
import { TbEdit } from 'react-icons/tb';

const GroupUserRole = ({ currentRole, disable }) => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(currentRole);

  if (!showForm)
    return (
      <div>
        <Chip
          color="blue-gray"
          value={currentRole}
          className="inline"
          size="sm"
        />
        <IconButton
          variant="text"
          ripple={false}
          onClick={() => setShowForm(true)}
          disabled={disable}
        >
          <TbEdit />
        </IconButton>
      </div>
    );
  else
    return (
      <div className="flex w-72 items-center gap-3">
        <Select
          color="blue-gray"
          label="Role"
          value={role}
          onChange={(value) => {
            setRole(value);
          }}
        >
          <Option value="member">Member</Option>
          <Option value="project-admin">Project Admin</Option>
          <Option value="group-admin">Group Admin</Option>
          <Option value="inactive">
            <span className="text-red-500">Inactive</span>
          </Option>
        </Select>
        <IconButton size="sm" color="blue" onClick={() => setShowForm(false)}>
          <IoIosCheckmark className="text-lg" />
        </IconButton>
        <IconButton size="sm" color="red" onClick={() => setShowForm(false)}>
          <IoMdClose />
        </IconButton>
      </div>
    );
};
GroupUserRole.propTypes = {
  currentRole: PropTypes.string,
  disable: PropTypes.bool,
};

export default GroupUserRole;
