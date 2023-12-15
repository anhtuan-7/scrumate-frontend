import { Chip, IconButton, Option, Select } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';
import { IoIosCheckmark, IoMdClose } from 'react-icons/io';
import { TbEdit } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

import FireErrorToast from '../../components/Toast';
import Toast from '../../components/Toast';
import { useChangeGroupMemberRoleMutation } from './groupUserApi';

const GroupUserRole = ({ member, disable }) => {
  const { groupId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(member.group.role);
  const [changeGroupMemberRole, { isLoading }] =
    useChangeGroupMemberRoleMutation();

  const handleSubmit = () => {
    changeGroupMemberRole({ memberId: member.id, groupId, role })
      .unwrap()
      .then((response) => {
        const affectedRow = response.data.affectedRow[0];
        if (affectedRow == 1) {
          Toast.fire({
            icon: 'success',
            title: 'Change Member Role Successfully',
          });
        }
      })
      .catch((error) => FireErrorToast(error))
      .finally(() => {
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
        >
          <Option value="member">Member</Option>
          <Option value="project-admin">Project Admin</Option>
          <Option value="group-admin">Group Admin</Option>
          <Option value="inactive">
            <span className="text-red-500">Inactive</span>
          </Option>
        </Select>
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
