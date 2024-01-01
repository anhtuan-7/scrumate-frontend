/* eslint-disable no-unused-vars */
import { Avatar, Option, Textarea, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Button, Input, Select } from '../../components';
import unwrapMutation from '../../utils/unwrapMutation';
import { useDeleteIssueMutation, useUpdateIssueMutation } from './issueApi';

const IssueUpdateForm = ({ issue }) => {
  const [disableForm, setDisableForm] = useState(true);
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description || '');
  const [status, setStatus] = useState(issue.status);
  const [type, setType] = useState(issue.type);
  const [priority, setPriority] = useState(issue.priority);
  const [assignee, setAssignee] = useState(issue.assigneeId?.toString() || '');
  const [updateIssue, { isLoading }] = useUpdateIssueMutation();
  const [deleteIssue] = useDeleteIssueMutation();

  const handleCancle = () => {
    setDisableForm(true);
    setTitle(issue.title);
    setDescription(issue.description || '');
    setStatus(issue.status);
    setType(issue.type);
    setPriority(issue.priority);
    setAssignee(issue.assigneeId?.toString() || '');
  };

  const handleDelete = () => {
    unwrapMutation(
      deleteIssue,
      {
        projectId: issue.projectId,
        sprintId: issue.sprintId,
        issueId: issue.id,
      },
      'Delete Successfully',
    );
  };

  const handleUpdate = () => {
    unwrapMutation(
      updateIssue,
      {
        title,
        description,
        status,
        type,
        priority,
        assignee,
        sprintId: issue.sprintId,
        projectId: issue.projectId,
        issueId: issue.id,
      },
      'Update Successfully',
    );
    setDisableForm(true);
  };

  return (
    <form className="flex h-full flex-col gap-4">
      <Input value={title} size="lg" disabled={disableForm} setFn={setTitle} />
      <Textarea
        disabled={disableForm}
        value={description}
        label="Description"
        color="blue-gray"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></Textarea>
      <div className="grid grid-cols-4 items-center gap-4">
        <Typography>Type</Typography>
        <div className="col-span-3">
          <Select disabled={disableForm} value={type} setFn={setType}>
            <Option value="task">
              <Typography variant="small">Task</Typography>
            </Option>
            <Option value="bug">
              <Typography variant="small">Bug</Typography>
            </Option>
            <Option value="story">
              <Typography variant="small">Story</Typography>
            </Option>
          </Select>
        </div>
        <Typography>Status</Typography>
        <div className="col-span-3">
          <Select disabled={disableForm} value={status} setFn={setStatus}>
            <Option value="to-do">
              <Typography color="pink" variant="small">
                To do
              </Typography>
            </Option>
            <Option value="in-progress">
              <Typography color="blue" variant="small">
                In progress
              </Typography>
            </Option>
            <Option value="done">
              <Typography color="teal" variant="small">
                Done
              </Typography>
            </Option>
          </Select>
        </div>
        <Typography>Priority</Typography>
        <div className="col-span-3">
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
            <Option value="low">
              <Typography color="blue-gray" variant="small">
                Low
              </Typography>
            </Option>
            <Option value="best-effort">
              <Typography color="red" variant="small">
                Best Effort
              </Typography>
            </Option>
          </Select>
        </div>
        <Typography>Assignee</Typography>
        <div className="col-span-3">
          <Select
            value={assignee}
            disabled={disableForm}
            setFn={setAssignee}
            size="lg"
          >
            <Option value={issue.reporterId.toString()}>
              <div>
                <Typography className="text-sm">
                  {issue.reporter.name}
                </Typography>
                <Typography className="text-xs">
                  {issue.reporter.email}
                </Typography>
              </div>
            </Option>
            <Option value="">
              <Typography variant="small">None</Typography>
            </Option>
          </Select>
        </div>
        <Typography>Reporter</Typography>
        <div className="col-span-3 flex items-center">
          <Avatar
            variant="circular"
            alt="avatar"
            className="mr-3 h-8 w-8 border-2 border-gray-500"
            src={issue.reporter?.avatar || '/profile/profile-1.png'}
          />
          <Typography variant="small">{issue.reporter.name}</Typography>
        </div>
      </div>
      <div className="self-end align-bottom">
        {disableForm ? (
          <>
            <Button
              variant="text"
              color="blue"
              onClick={() => setDisableForm(false)}
            >
              Edit
            </Button>
            <Button variant="text" color="red" onClick={handleDelete}>
              Delete
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="text"
              color="blue"
              onClick={handleUpdate}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button variant="text" color="blue-gray" onClick={handleCancle}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
IssueUpdateForm.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default IssueUpdateForm;
