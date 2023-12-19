import PropTypes from 'prop-types';

const SprintBacklog = ({ sprint }) => {
  return <div>Sprint ID: {sprint.id}</div>;
};
SprintBacklog.propTypes = {
  sprint: PropTypes.object,
};

export default SprintBacklog;
