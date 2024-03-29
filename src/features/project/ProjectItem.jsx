import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import formatISODate from '../../utils/dateFormat';

const ProjectItem = ({ project }) => {
  return (
    <Card className="flex justify-between border-2 border-blue-100 bg-blue-100/30">
      <CardBody className="flex flex-col gap-2 p-3">
        {project.group && <Typography>Group: {project.group.name}</Typography>}
        <Link
          to={`/projects/${project.id}`}
          className="flex items-center justify-between"
        >
          <div className="mr-6 flex gap-3 hover:cursor-pointer hover:text-blue-500">
            <Typography variant="h4">{project.name}</Typography>
          </div>
        </Link>
        <Typography>Description: {project.description || 'None'}</Typography>
        <div>
          Your role:
          <Chip
            size="sm"
            color="blue"
            value={`${project.projectUser.role}`}
            className="ml-2 inline"
          />
        </div>
      </CardBody>
      <CardFooter className="mt-6 border-t-2 border-gray-300 p-3">
        {project.projectUser && (
          <div>
            <Typography variant="small">
              Last accessed: {formatISODate(project.projectUser.lastAccessed)}
            </Typography>
            <Typography variant="small">
              Joined at: {formatISODate(project.projectUser.joinedAt)}
            </Typography>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
ProjectItem.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectItem;
