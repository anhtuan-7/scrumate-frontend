import { Button, Input, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';

import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import { useCreateProjectMutation } from './projectApi';

const ProjectCreateForm = ({ groupId, open, handler }) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [description, setDescription] = useState('');
  const [repository, setRepository] = useState('');
  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleCreateForm = () => {
    createProject({ name, key, description, repository, groupId })
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
        setKey('');
        setRepository('');
      });
  };

  const actionBar = (
    <div className="flex gap-3 p-0">
      <Button variant="text" color="blue-gray" onClick={handler}>
        Cancel
      </Button>
      <Button variant="gradient" color="blue" onClick={handleCreateForm}>
        <div className="flex justify-center">
          {isLoading ? <GoSync className="animate-spin" /> : 'Create'}
        </div>
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
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            color="blue"
            required
          />
          <Input
            type="text"
            label="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
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
          <Input
            type="url"
            label="Repository URL"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
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
ProjectCreateForm.propTypes = {
  handler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  groupId: PropTypes.string.isRequired,
};

export default ProjectCreateForm;
