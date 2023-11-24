import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import Skeleton from '../../components/Skeleton';
import GroupCreateForm from './GroupCreateForm';
import { useGetGroupListQuery } from './groupApi';

const GroupList = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { data, isFetching } = useGetGroupListQuery({ id: user.id });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const closeForm = () => setShowCreateForm(false);

  let content;
  if (isFetching) content = <Skeleton times={5} className="h-8 w-full" />;
  else if (data)
    content = (
      <div>
        <p>{data.data.groups[0].name}</p>
        <p>{data.data.groups.length}</p>
      </div>
    );
  return (
    <div>
      {showCreateForm && <GroupCreateForm onClose={closeForm} />}
      <Button
        color="blue"
        className="flex items-center gap-2 p-3"
        onClick={() => setShowCreateForm(true)}
      >
        <HiOutlinePlusCircle className="text-xl" /> NEW GROUP
      </Button>
      {content}
    </div>
  );
};

export default GroupList;
