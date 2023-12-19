import PropTypes from 'prop-types';

const SprintItem = ({ sprint }) => {
  return <div>{sprint.name}</div>;
};
SprintItem.propTypes = {
  sprint: PropTypes.object,
};

export default SprintItem;
