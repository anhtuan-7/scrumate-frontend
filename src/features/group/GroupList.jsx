import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import Skeleton from '../../components/Skeleton';
import GroupCreateForm from './GroupCreateForm';
import GroupItem from './GroupItem';
import { useGetGroupListQuery } from './groupApi';

const GroupList = () => {
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
    <div className="flex flex-col items-center">
      <GroupCreateForm open={showCreateForm} handler={clickHandler} />
      <Button
        color="blue"
        className="flex items-center gap-2 p-3"
        onClick={clickHandler}
      >
        <HiOutlinePlusCircle className="text-xl" /> NEW GROUP
      </Button>
      <div className="w-full">{content}</div>
    </div>
  );
};

export default GroupList;
