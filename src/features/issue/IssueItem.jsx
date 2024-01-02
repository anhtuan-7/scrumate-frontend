import {
  Avatar,
  Card,
  CardBody,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { RiDraggable, RiMoreLine } from 'react-icons/ri';

import { Drawer } from '../../components';
import {
  formatPriority,
  formatStatus,
  formatType,
} from '../../utils/formatText';
import IssueUpdateForm from './IssueUpdateForm';

const IssueItem = ({ issue }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Fragment>
      <Drawer open={openForm} handler={setOpenForm}>
        <IssueUpdateForm issue={issue} />
      </Drawer>
      <Card className="rounded-lg border-2 border-blue-200">
        <CardBody className="p-0">
          <div className="grid grid-cols-2 items-center gap-3">
            <div className="flex items-center gap-3">
              <RiDraggable className="mr-1 text-lg" />
              {formatType(issue.type)}
              <Typography variant="small">{issue.title}</Typography>
            </div>
            <div className="flex items-center gap-3 justify-self-end">
              {formatPriority(issue.priority)}
              {formatStatus(issue.status)}
              <Avatar
                variant="circular"
                alt="avatar"
                src={
                  issue.assignee
                    ? '/profile/profile-1.png'
                    : '/profile/profile.png'
                }
                title={issue.assignee?.name || 'Not assign yet'}
                className="h-6 w-6 border border-gray-400"
              />
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
