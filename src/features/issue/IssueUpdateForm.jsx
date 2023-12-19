/* eslint-disable no-unused-vars */
import { Avatar, Option, Textarea, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Input, Select } from '../../components';

const IssueUpdateForm = ({ issue }) => {
  const [disableForm, setDisableForm] = useState(true);
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description || '');
  const [status, setStatus] = useState(issue.status);
  const [type, setType] = useState(issue.type);
  const [priority, setPriority] = useState(issue.priority);
  const [assignee, setAssignee] = useState(
    issue.assigneeId?.toString() || 'None',
  );

  return (
    <div className="flex flex-col gap-6">
      <Input value={title} size="lg" disabled={disableForm} setFn={setTitle} />
      <Textarea
        disabled={disableForm}
        value={description}
        label="Description"
        color="blue-gray"
        className="!border !border-gray-500"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></Textarea>
      <div className="grid grid-cols-3 items-center gap-4">
        <Typography>Status</Typography>
        <div className="col-span-2">
          <Select disabled={disableForm} value={status} setFn={setStatus}>
            <Option value="to-do">To do</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="done">Done</Option>
          </Select>
        </div>
        <Typography>Type</Typography>
        <div className="col-span-2">
          <Select disabled={disableForm} value={type} setFn={setType}>
            <Option value="task">Task</Option>
            <Option value="bug">Bug</Option>
            <Option value="story">Story</Option>
          </Select>
        </div>
        <Typography>Priority</Typography>
        <div className="col-span-2">
          <Select disabled={disableForm} value={priority} setFn={setPriority}>
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
              <Typography color="blue-gray">Low</Typography>
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
            value={assignee}
            size="lg"
            disabled={disableForm}
            setFn={setAssignee}
          >
            <Option value={issue.reporterId.toString()}>
              <Typography>{issue.reporter.name}</Typography>
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
            className="mr-3 h-8 w-8 border-2 border-gray-500"
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
