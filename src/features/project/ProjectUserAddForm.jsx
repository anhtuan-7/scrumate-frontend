import { IconButton, Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { Button, Modal, Select } from '../../components';
import { projectUserRoleOptions } from '../../utils/constants';
import unwrapMutation from '../../utils/unwrapMutation';
import GroupUserList from './GroupUserList';
import { useAddProjectUserMutation } from './projectUserApi';

const ProjectUserAddForm = ({ open, handler, project }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('developer');
  const [addProjectUser, { isLoading }] = useAddProjectUserMutation();

  const handleCancel = () => {
    setEmail('');
    handler();
  };

  const handleSubmit = () => {
    unwrapMutation(
      addProjectUser,
      {
        email,
        role,
        projectId: project.id,
      },
      'New Member Added Successfully! 🚀',
    ).finally(() => {
      handleCancel();
    });
  };

  const actionBar = (
    <div className="flex gap-3 p-0">
      <Button variant="text" color="blue-gray" onClick={handleCancel}>
        Cancel
      </Button>
      <Button
        variant="gradient"
        color="blue"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Add
      </Button>
    </div>
  );
  return (
    <Modal actionBar={actionBar} open={open} handler={handler}>
      <div>
        <Typography variant="h4" color="blue" className="py-3">
          Add new member
        </Typography>
        <form className="grid gap-4">
          <div className="relative flex w-full">
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="blue"
              className="pr-20"
              containerProps={{
                className: 'min-w-0',
              }}
              required
            />
            <IconButton
              size="sm"
              color={email ? 'blue' : 'blue-gray'}
              disabled={!email}
              className="!absolute right-1 top-1 items-center rounded"
              onClick={() => setEmail('')}
              variant="text"
            >
              <IoMdClose />
            </IconButton>
          </div>
          <Select
            variant="outlined"
            label="Role"
            value={role}
            onChange={(value) => {
              setRole(value);
            }}
            options={projectUserRoleOptions}
          />
          <GroupUserList
            groupId={project.groupId}
            isOpen={open}
            search={email}
            setFn={setEmail}
          />
        </form>
      </div>
    </Modal>
  );
};

ProjectUserAddForm.propTypes = {
  handler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
};

export default ProjectUserAddForm;
