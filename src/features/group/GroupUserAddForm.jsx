import {
  Avatar,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';
import { useLazyGetUserQuery } from '../user/userApi';
import { useAddGroupMemberMutation } from './groupUserApi';

const GroupUserAddForm = ({ open, handler, groupId }) => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [addGroupMember, { isLoading }] = useAddGroupMemberMutation();
  const [trigger, { isLoading: isSearching }] = useLazyGetUserQuery();

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
    trigger({ email }, true) // preferCacheValue = true
      .unwrap()
      .then((response) => {
        setMessage('');
        setUser(response.data.user);
      })
      .catch((error) => {
        setUser(null);
        setMessage(error.data.message);
      });
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
              isLoading={isSearching}
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
            <Card className="mt-3 p-2">
              <Typography variant="small">Search result:</Typography>
              <CardBody className="flex gap-3 p-2">
                <Avatar
                  variant="circular"
                  size="md"
                  alt="avatar"
                  src="/profile/profile-1.png"
                />
                <div>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography variant="small">{user.email}</Typography>
                </div>
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
