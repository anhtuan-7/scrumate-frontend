import { Avatar, Spinner, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { useLazyGetGroupUserListQuery } from '../group/groupUserApi';

const GroupUserList = ({ groupId, search, setFn, isOpen }) => {
  const [trigger, { data: response }] = useLazyGetGroupUserListQuery();

  useEffect(() => {
    isOpen && trigger({ groupId, all: true }, true);
  }, [isOpen, trigger, groupId]);

  let content = <Spinner className="inline-block h-8 w-8" color="blue" />;
  if (response) {
    const { members } = response.data;
    console.log(response);

    content = members.map((member) => {
      if (member.email.includes(search))
        return (
          <div
            key={member.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg border-2 p-2 hover:border-blue-300"
            onClick={() => setFn(member.email)}
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="avatar"
              src="/profile/profile-1.png"
            />
            <div>
              <Typography>
                {member.name}
                <span className="ms-1 text-xs">({member.group.role})</span>
              </Typography>
              <Typography variant="small">{member.email}</Typography>
            </div>
          </div>
        );
    });
  }

  return (
    <div className=" max-h-48 w-full overflow-y-auto rounded-lg border border-gray-500 p-2">
      <Typography className="mb-3">User List</Typography>
      <div className="flex flex-col gap-3">{content}</div>
    </div>
  );
};
GroupUserList.propTypes = {
  groupId: PropTypes.number.isRequired,
  search: PropTypes.string.isRequired,
  setFn: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default GroupUserList;
