import { ListItem, ListItemPrefix } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ icon, text, url }) => {
  return (
    <NavLink to={url}>
      <ListItem className="pr-10 focus:text-blue-500 md:pr-24">
        <ListItemPrefix>{icon}</ListItemPrefix>
        {text}
      </ListItem>
    </NavLink>
  );
};
SidebarLink.propTypes = {
  icon: PropTypes.object,
  text: PropTypes.string,
  url: PropTypes.string,
};

export default SidebarLink;
