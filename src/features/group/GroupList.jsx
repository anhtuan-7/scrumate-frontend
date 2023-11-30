import { Button, Option, Select } from '@material-tailwind/react';
import { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import Skeleton from '../../components/Skeleton';
import GroupCreateForm from './GroupCreateForm';
import GroupItem from './GroupItem';
import { useGetGroupListQuery } from './groupApi';

const GroupList = () => {
  const [sort, setSort] = useState('lastAccessed');
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { data, isFetching } = useGetGroupListQuery({ id: user.id });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const clickHandler = () => setShowCreateForm(!showCreateForm);

  let content;
  if (isFetching) content = <Skeleton times={10} className="h-8 w-full" />;
  else if (data) {
    const { groups } = data.data;
    content = groups.map((group) => <GroupItem group={group} key={group.id} />);
  }

  return (
    <div className="ml-4 flex w-full min-w-max flex-col items-center p-4">
      <GroupCreateForm open={showCreateForm} handler={clickHandler} />
      <div className="grid w-full grid-cols-1 gap-4">
        <div className="flex items-center justify-between">
          <div className="mr-6">
            <Select
              variant="outlined"
              label="Sort by"
              value={sort}
              onChange={(value) => {
                setSort(value);
              }}
            >
              <Option value="lastAccessed">Last accessed</Option>
              <Option value="joinedAt">Last joined</Option>
            </Select>
          </div>
          <Button
            color="blue"
            className="flex w-36 items-center justify-center gap-2 p-3"
            onClick={clickHandler}
          >
            <HiOutlinePlusCircle className="text-xl" /> NEW GROUP
          </Button>
        </div>

        <div className="grid w-full grid-cols-1 gap-3">{content}</div>
      </div>
    </div>
  );
};

export default GroupList;
