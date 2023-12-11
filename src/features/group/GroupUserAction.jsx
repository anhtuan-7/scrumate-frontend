import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const GroupUserAction = ({ member, group }) => {
  const { user } = useSelector((state) => state.status);

  if (group.groupUser.role === 'group-admin')
    return (
      <div className="flex justify-end">
        <Button variant="text" size="sm" color="blue">
          Detail
        </Button>
        <Button
          variant="text"
          size="sm"
          color="red"
          disabled={member.id === user.id}
        >
          Deactivate
        </Button>
      </div>
    );
  else return '';
};
GroupUserAction.propTypes = {
  member: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
};

export default GroupUserAction;
