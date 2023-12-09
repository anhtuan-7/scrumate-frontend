import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoSync } from 'react-icons/go';

import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import { useAddGroupMemberMutation } from './groupUserApi';

const GroupUserAddForm = ({ open, handler, groupId }) => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [addGroupMember, { isLoading }] = useAddGroupMemberMutation();

  const handleCreateForm = () => {
    addGroupMember({ email, role, groupId })
      .unwrap()
      .then(() => {
        handler();
        Toast.fire({
          title: 'New Member Added Successfully! 🚀',
          icon: 'success',
        });
      })
      .catch((error) => {
        setMessage(error.data.message);
      });
  };

  const handleFindUser = () => {
    setMessage('');
    setUser('User found!');
  };

  const onCancel = () => {
    setMessage('');
    setUser('');
    handler();
  };

  const actionBar = (
    <div className="flex gap-3 p-0">
      <Button variant="text" color="blue-gray" onClick={onCancel}>
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
          Add new member
        </Typography>
        <form className="grid gap-4 ">
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
            <Button
              size="sm"
              color={email ? 'blue' : 'blue-gray'}
              disabled={!email}
              className="!absolute right-1 top-1 rounded"
              onClick={handleFindUser}
            >
              Find
            </Button>
          </div>
          <Select
            variant="outlined"
            label="Role"
            value={role}
            onChange={(value) => {
              setRole(value);
            }}
          >
            <Option value="member">Member</Option>
            <Option value="project-admin">Project Admin</Option>
            <Option value="group-admin">Group Admin</Option>
          </Select>
          {user && (
            <Card>
              <CardBody className="px-2">
                <Typography variant="small">User Found!</Typography>
              </CardBody>
            </Card>
          )}
        </form>
        <Typography color="red" className="p-1" variant="small">
          {message}
        </Typography>
      </div>
    </Modal>
  );
};

GroupUserAddForm.propTypes = {
  handler: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  groupId: PropTypes.number.isRequired,
};

export default GroupUserAddForm;
