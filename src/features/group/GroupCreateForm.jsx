import { Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import { useCreateGroupMutation } from './groupApi';

const GroupCreateForm = ({ open, handler }) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const handleCreateForm = () => {
    createGroup({ name, description })
      .unwrap()
      .then(() => {
        handler();
        Toast.fire({
          title: 'Create New Group Successfully',
          icon: 'success',
        });
      })
      .catch((e) => setMessage(e.data.message))
      .finally(() => {
        setDescription('');
        setName('');
      });
  };

  const actionBar = (
    <div className="flex gap-3 p-0">
      <Button variant="text" color="blue-gray" onClick={handler}>
        Cancel
      </Button>
      <Button
        variant="gradient"
        color="blue"
        onClick={handleCreateForm}
        isLoading={isLoading}
      >
        Create
      </Button>
    </div>
  );

  return (
    <Modal actionBar={actionBar} open={open} handler={handler}>
      <div>
        <Typography variant="h4" color="blue" className="py-3">
          Create a new Project
        </Typography>
        <form className="grid gap-4 ">
          <Input
            type="text"
            label="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            color="blue"
            required
          />
          <Input
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            color="blue"
          />
        </form>
        <Typography color="red" className="p-1" variant="small">
          {message}
        </Typography>
      </div>
    </Modal>
  );
};

GroupCreateForm.propTypes = {
  handler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default GroupCreateForm;
