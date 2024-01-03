import { Chip, IconButton } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';
import { IoIosCheckmark, IoMdClose } from 'react-icons/io';
import { TbEdit } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

import { Select } from '../../components';
import { projectUserRoleOptions } from '../../utils/constants';
import unwrapMutation from '../../utils/unwrapMutation';
import { useUpdateProjectUserRoleMutation } from './projectUserApi';

const ProjectUserRole = ({ member, disable }) => {
  const { projectId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState(member.project.role);
  const [updateProjectUserRole, { isLoading }] =
    useUpdateProjectUserRoleMutation();

  const handleSubmit = () => {
    unwrapMutation(
      updateProjectUserRole,
      {
        userId: member.id,
        projectId,
        role,
      },
      'Update Member Role Successfully',
    ).finally(() => {
      setShowForm(false);
    });
  };

  if (!showForm)
    return (
      <div>
        <Chip
          color={member.project.role === 'inactive' ? 'blue-gray' : 'blue'}
          value={member.project.role}
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
          options={projectUserRoleOptions}
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
ProjectUserRole.propTypes = {
  member: PropTypes.object,
  disable: PropTypes.bool,
};

export default ProjectUserRole;
