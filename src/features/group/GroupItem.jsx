import PropTypes from 'prop-types';

const GroupItem = ({ group }) => {
  return <div>{group.name}</div>;
};
GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItem;
