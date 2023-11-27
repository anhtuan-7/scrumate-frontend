import { Card, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GroupItem = ({ group }) => {
  return (
    <Card className="flex min-w-max justify-center border-2 border-blue-100 p-3 shadow-none">
      <Link to={`/groups/${group.id}`}>
        <Typography className="hover:cursor-pointer hover:text-blue-500">
          {group.name}
        </Typography>
      </Link>
    </Card>
  );
};
GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItem;
