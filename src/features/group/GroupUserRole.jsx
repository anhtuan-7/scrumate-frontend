import { Chip, IconButton } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';
import { IoIosCheckmark, IoMdClose } from 'react-icons/io';
import { TbEdit } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

import { Select } from '../../components';
import { groupUserRoleOptions } from '../../utils/constants';
import unwrapMutation from '../../utils/unwrapMutation';
import { useUpdateGroupUserRoleMutation } from './groupUserApi';

const GroupUserRole = ({ member, disable }) => {
  const { groupId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(member.group.role);
  const [updateGroupUserRole, { isLoading }] = useUpdateGroupUserRoleMutation();

  const handleSubmit = () => {
    unwrapMutation(
      updateGroupUserRole,
      { userId: member.id, groupId, role },
      'Update Member Role Successfully',
    ).finally(() => {
      setShowForm(false);
    });
  };

  if (!showForm)
    return (
      <div>
        <Chip
          color={member.group.role === 'inactive' ? 'blue-gray' : 'blue'}
          value={member.group.role}
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
          options={groupUserRoleOptions}
        />
        <IconButton size="sm" color="blue" onClick={handleSubmit}>
          {isLoading ? (
            <GoSync className="animate-spin" />
          ) : (
            <IoIosCheckmark className="text-lg" />
          )}
        </IconButton>
        <IconButton size="sm" color="red" onClick={() => setShowForm(false)}>
          <IoMdClose />
        </IconButton>
      </div>
    );
};
GroupUserRole.propTypes = {
  member: PropTypes.object,
  disable: PropTypes.bool,
};

export default GroupUserRole;
