import { Card, Chip, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import formatISOdate from '../../utils/dateFormat';

const GroupItem = ({ group }) => {
  return (
    <Card className="flex min-w-max justify-center border-2 border-blue-100 p-3 shadow-none">
      <Link
        to={`/groups/${group.id}`}
        className="flex items-center justify-between"
      >
        <div className="mr-6 flex gap-3 hover:cursor-pointer hover:text-blue-500">
          <Typography>{group.name}</Typography>
          <Chip
            className="min-w-min"
            color="blue"
            value={group.groupUser.role}
          />
        </div>
        <Typography variant="small">
          Last accessed: {formatISOdate(group.groupUser.lastAccessed)}
        </Typography>
      </Link>
    </Card>
  );
};
GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItem;
