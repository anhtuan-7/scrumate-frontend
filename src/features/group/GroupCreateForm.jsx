import { Button, Input, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';

import Modal from '../../components/Modal';
import { useCreateGroupMutation } from './groupApi';

const GroupCreateForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState();
  const [description, setDescription] = useState('');
  const [createGroup, { isSuccess, error, isLoading }] =
    useCreateGroupMutation();

  const handleCreateForm = () => {
    createGroup({ name, description })
      .unwrap()
      .then(() => onClose())
      .catch((e) => setMessage(e.data.message));
  };

  const actionBar = (
    <div className="flex gap-3">
      <Button onClick={handleCreateForm} color="blue">
        <div className="flex justify-center">
          {isLoading ? <GoSync className="animate-spin" /> : 'Create'}
        </div>
      </Button>
      <Button onClick={onClose} color="blue-gray">
        Cancel
      </Button>
    </div>
  );

  const modal = (
    <Modal actionBar={actionBar} classes="lg:inset-x-1/4 xl:inset-x-1/3">
      <div>
        <Typography variant="h4" color="blue" className="py-3">
          Create a new Group
        </Typography>
        <form className="grid gap-4">
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
        <Typography color="red">{message}</Typography>
      </div>
    </Modal>
  );

  return modal;
};

export default GroupCreateForm;
