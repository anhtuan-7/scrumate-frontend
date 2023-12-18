/* eslint-disable no-unused-vars */
import { Avatar, Option, Textarea, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Input, Select } from '../../components';

const IssueUpdateForm = ({ issue }) => {
  const [disableForm, setDisableForm] = useState(true);
  const [title, setTitle] = useState(issue.title);

  return (
    <div className="flex flex-col gap-6">
      <Input value={title} size="lg" disabled={disableForm} />
      <Textarea
        value={issue.description}
        label="Description"
        color="blue-gray"
      ></Textarea>
      <div className="grid grid-cols-3 items-center gap-4">
        <Typography>Status</Typography>
        <div className="col-span-2">
          <Select disabled={disableForm} value={issue.status}>
            <Option value="to-do">To do</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </div>
        <Typography>Type</Typography>
        <div className="col-span-2">
          <Select disabled={disableForm} value={issue.type}>
            <Option value="task">Task</Option>
            <Option value="bug">Bug</Option>
            <Option value="story">Story</Option>
          </Select>
        </div>
        <Typography>Priority</Typography>
        <div className="col-span-2">
          <Select disabled={disableForm} value={issue.priority}>
            <Option value="high">
              <Typography color="pink" variant="small">
                High
              </Typography>
            </Option>
            <Option value="medium">
              <Typography color="orange" variant="small">
                Medium
              </Typography>
            </Option>
            <Option value="low" variant="small">
              <Typography color="gray-blue">Low</Typography>
            </Option>
            <Option value="best-effort">
              <Typography color="red" variant="small">
                Best Effort
              </Typography>
            </Option>
          </Select>
        </div>
        <Typography>Assignee</Typography>
        <div className="col-span-2">
          <Select
            value={issue.assigneeId || 'None'}
            size="lg"
            disabled={disableForm}
          >
            <Option value={issue.reporterId}>
              <div className="flex items-center gap-1">
                <Avatar
                  variant="circular"
                  size="sm"
                  src={issue.reporter?.avatar || '/profile/profile-1.png'}
                />
                <Typography>{issue.reporter.name}</Typography>
              </div>
            </Option>
            <Option value="None">
              <Typography>None</Typography>
            </Option>
          </Select>
        </div>
        <Typography>Reporter</Typography>
        <div className="col-span-2 flex items-center">
          <Avatar
            variant="circular"
            alt="avatar"
            src={issue.reporter?.avatar || '/profile/profile-1.png'}
          />
          <Typography>{issue.reporter.name}</Typography>
        </div>
      </div>
    </div>
  );
};
IssueUpdateForm.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default IssueUpdateForm;
