import { Card, List, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const Sidebar = ({ children, title, role }) => {
  return (
    <Card className="min-w-fit rounded-none border-r border-gray-300 shadow-none">
      <List className="mr-3 grid min-w-fit items-center gap-3">
        <div className="my-4">
          <Typography variant="h4">{title}</Typography>
          <div className="mt-2 w-fit">{role}</div>
        </div>
        {children}
      </List>
    </Card>
  );
};
Sidebar.propTypes = {
  children: PropTypes.array, // navigation links
  title: PropTypes.string.isRequired,
  role: PropTypes.object,
};

export default Sidebar;
