import {
  Button,
  Chip,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Table from '../../components/Table';
import formatISODate from '../../utils/dateFormat';
import { useGetGroupMemberQuery } from './groupUserApi';

const GroupMember = () => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.status);
  const { data, isFetching } = useGetGroupMemberQuery({ groupId });

  let content;
  if (isFetching)
    content = <Spinner className="inline-block h-8 w-8" color="blue" />;
  else if (data) {
    const { members } = data.data;
    console.log(members);
    const tableConfig = [
      {
        label: 'Name',
        render: (member) => (
          <Typography color="blue-gray" className="font-normal">
            {member.name}
          </Typography>
        ),
      },
      {
        label: 'Email',
        render: (member) => (
          <Typography color="blue-gray" className="font-normal">
            {member.email}
          </Typography>
        ),
      },
      {
        label: 'Role',
        render: (member) => (
          <Chip
            size="small"
            color="blue-gray"
            value={member.group.role}
            className="inline"
          />
        ),
      },
      {
        label: 'Joined at',
        render: (member) => (
          <Typography color="blue-gray" className="font-normal">
            {formatISODate(member.group.joinedAt)}
          </Typography>
        ),
      },
      {
        label: 'Last accessed',
        render: (member) => (
          <Typography color="blue-gray" className="font-normal">
            {formatISODate(member.group.lastAccessed)}
          </Typography>
        ),
      },
      {
        label: '',
        render: (member) => (
          <Typography
            variant="small"
            color="blue-gray"
            className="flex justify-end"
          >
            <Button
              variant="text"
              size="sm"
              color="blue"
              disabled={member.id === user.id}
            >
              Edit
            </Button>
            <Button variant="text" size="sm" color="red">
              Inactivate
            </Button>
          </Typography>
        ),
      },
    ];
    content = (
      <Table
        config={tableConfig}
        data={members}
        keyFn={(member) => member.label || member.id}
      />
    );
  }
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Input label="Search" icon={<FiSearch />} />
        </div>
        <Button
          color="blue"
          className="flex w-36 items-center justify-center gap-2 p-3"
        >
          <FiUserPlus className="text-lg" />
          New Member
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default GroupMember;
