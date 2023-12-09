import {
  Button,
  Chip,
  Input,
  Spinner,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { FiSearch, FiUserPlus } from 'react-icons/fi';
import { useOutletContext } from 'react-router-dom';

import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import formatISODate from '../../utils/dateFormat';
import GroupUserAction from './GroupUserAction';
import GroupUserAddForm from './GroupUserAddForm';
import { useGetGroupMemberQuery } from './groupUserApi';

const GroupMember = () => {
  const group = useOutletContext();
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetGroupMemberQuery({
    groupId: group.id,
    page,
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const clickHandler = () => setShowCreateForm(!showCreateForm);

  let content;
  if (isFetching)
    content = <Spinner className="inline-block h-8 w-8" color="blue" />;
  else if (data) {
    const { members } = data.data;
    const tableConfig = [
      {
        label: 'Name',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {member.name}
          </Typography>
        ),
      },
      {
        label: 'Email',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {member.email}
          </Typography>
        ),
      },
      {
        label: 'Role',
        render: (member) => (
          <Chip
            color="blue-gray"
            value={member.group.role}
            className="inline"
            size="sm"
          />
        ),
      },
      {
        label: 'Joined at',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {formatISODate(member.group.joinedAt)}
          </Typography>
        ),
      },
      {
        label: 'Last accessed',
        render: (member) => (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {formatISODate(member.group.lastAccessed)}
          </Typography>
        ),
      },
      {
        label: '',
        render: (member) => {
          if (group.groupUser.role !== 'group-admin') return '';
          return <GroupUserAction member={member} group={group} />;
        },
      },
    ];
    content = (
      <div className="flex flex-col items-center gap-9">
        <Table config={tableConfig} data={members} />
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          lastPage={Math.ceil(data.total / 10)}
        />
      </div>
    );
  }
  return (
    <div className="w-full">
      <GroupUserAddForm
        open={showCreateForm}
        handler={clickHandler}
        groupId={group.id}
      />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Input color="blue" label="Search" icon={<FiSearch />} />
        </div>
        <Button
          color="blue"
          className="flex w-36 items-center justify-center gap-2 p-3"
          onClick={clickHandler}
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
