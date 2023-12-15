import { Card, CardBody, Chip, IconButton } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { CiBookmarkCheck } from 'react-icons/ci';
import { GiBugNet } from 'react-icons/gi';
import { PiCodeLight } from 'react-icons/pi';
import { RiDraggable, RiMoreLine } from 'react-icons/ri';

import Drawer from '../../components/Drawer';

const IssueItem = ({ issue }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Fragment>
      <Drawer open={openForm} handler={setOpenForm}></Drawer>
      <Card className="rounded-lg border-2 border-blue-200">
        <CardBody className="p-1">
          <div className="grid grid-cols-2 items-center gap-3">
            <div className="flex items-center gap-3">
              <RiDraggable className="mr-1 text-lg" />
              {formatType(issue.type)}
              {issue.title}
            </div>
            <div className="flex items-center gap-3 justify-self-end">
              {formatPriority(issue.priority)}
              {formatStatus(issue.status)}
              {/* TO-DO: Assignee */}
              <IconButton
                variant="text"
                size="sm"
                onClick={() => setOpenForm(true)}
              >
                <RiMoreLine className="text-lg" />
              </IconButton>
            </div>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};
IssueItem.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default IssueItem;

function formatType(type) {
  switch (type) {
    case 'task':
      return <PiCodeLight className="text-xl text-blue-500" />;
    case 'bug':
      return <GiBugNet className="text-xl text-red-500" />;
    case 'story':
      return <CiBookmarkCheck className="text-xl text-green-500" />;
  }
}

function formatStatus(status) {
  switch (status) {
    case 'to-do':
      return <Chip value="To do" color="pink" size="sm" />;
    case 'in-progress':
      return <Chip value="In Progress" color="blue" size="sm" />;
    case 'done':
      return <Chip value="Done" color="teal" size="sm" />;
  }
}

function formatPriority(priority) {
  switch (priority) {
    case 'low':
      return <Chip value="Low" color="blue-gray" size="sm" />;
    case 'medium':
      return (
        <Chip value="Medium" size="sm" className="bg-yellow-900 text-white" />
      );
    case 'high':
      return <Chip value="High" color="pink" size="sm" />;
    case 'best-effort':
      return <Chip value="Best Effort" color="red" size="sm" />;
  }
}
