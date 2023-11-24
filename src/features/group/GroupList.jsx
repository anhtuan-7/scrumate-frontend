import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import GroupCreateForm from './GroupCreateForm';
import { useGetGroupListQuery } from './groupApi';

const GroupList = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { data, error } = useGetGroupListQuery({ id: user.id });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const closeForm = () => setShowCreateForm(false);

  if (error) console.log(error);

  if (data)
    return (
      <div>
        <p>Tab Group|Project</p>
        {showCreateForm && <GroupCreateForm onClose={closeForm} />}
        <Button
          color="blue"
          className="flex items-center gap-2 p-3"
          onClick={() => setShowCreateForm(true)}
        >
          <HiOutlinePlusCircle className="text-xl" /> NEW GROUP
        </Button>
        <p>{data.data.groups[0].name}</p>
        <p>{data.data.groups.length}</p>
      </div>
    );
};

export default GroupList;
