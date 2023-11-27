import { Card, List, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const Sidebar = ({ children, title }) => {
  return (
    <Card className="h-screen min-w-max rounded-none border-r border-gray-300 bg-white shadow-none">
      <List className="grid min-w-max items-center gap-3 pr-10 md:pr-24">
        <div className="py-4">
          <Typography variant="h4">{title}</Typography>
        </div>
        <>{children}</>
      </List>
    </Card>
  );
};
Sidebar.propTypes = {
  children: PropTypes.array, // navigation links
  title: PropTypes.string.isRequired,
};

export default Sidebar;
