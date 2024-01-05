/* eslint-disable no-unused-vars */
import { Avatar, Textarea, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';

import { Button, Input, Select } from '../../components';
import {
  issuePriorityOptions,
  issueStatusOptions,
  issueTypeOptions,
} from '../../utils/constants';
import unwrapMutation from '../../utils/unwrapMutation';
import IssueAssigneeForm from './IssueAssigneeForm';
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

  const actionBar = disableForm ? (
    <Fragment>
      <Button variant="text" color="blue" onClick={() => setDisableForm(false)}>
        Edit
      </Button>
      <Button variant="text" color="red" onClick={handleDelete}>
        Delete
      </Button>
    </Fragment>
  ) : (
    <Fragment>
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
    </Fragment>
  );

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
          <Select
            disabled={disableForm}
            value={type}
            setFn={setType}
            options={issueTypeOptions}
          />
        </div>
        <Typography>Status</Typography>
        <div className="col-span-3">
          <Select
            disabled={disableForm}
            value={status}
            setFn={setStatus}
            options={issueStatusOptions}
          />
        </div>
        <Typography>Priority</Typography>
        <div className="col-span-3">
          <Select
            disabled={disableForm}
            value={priority}
            setFn={setPriority}
            options={issuePriorityOptions}
          />
        </div>
        <Typography>Assignee</Typography>
        <div className="col-span-3">
          <IssueAssigneeForm
            projectId={issue.projectId}
            assignee={assignee}
            setFn={setAssignee}
            disabled={disableForm}
          />
        </div>
        <Typography>Reporter</Typography>
        <div className="col-span-3 flex items-center">
          <Avatar
            variant="circular"
            alt="avatar"
            className="mr-3 h-8 w-8 border-2 border-gray-500"
            src={issue.reporter.avatar || '/profile/profile-1.png'}
          />
          <Typography variant="small">{issue.reporter.name}</Typography>
        </div>
      </div>
      <div className="self-end align-bottom">{actionBar}</div>
    </form>
  );
};
IssueUpdateForm.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default IssueUpdateForm;
