import { Input, Option, Select, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import { useGetProjectUserListQuery } from '../project/projectUserApi';

const IssueAssigneeForm = ({ projectId, assignee, setFn, disabled }) => {
  const { data: response } = useGetProjectUserListQuery({
    projectId,
    all: true,
  });

  if (response) {
    let assigneeOptions = [{ value: '', label: 'None' }];
    const { members } = response.data;
    members.forEach((member) => {
      assigneeOptions.push({
        value: member.id.toString(),
        label: (
          <Fragment>
            <Typography variant="small">{member.name}</Typography>
            <Typography variant="small">{member.email}</Typography>
          </Fragment>
        ),
      });
    });
    const renderedOptions = assigneeOptions.map((option) => (
      <Option value={option.value} key={option.value}>
        {option.label}
      </Option>
    ));

    return (
      <Select
        labelProps={{ className: 'hidden' }}
        className="!border !border-gray-500"
        onChange={(value) => setFn(value)}
        size="lg"
        disabled={disabled}
        value={assignee}
      >
        {renderedOptions}
      </Select>
    );
  }
  return (
    <Input
      disabled
      className="!border !border-gray-500"
      value={'Error'}
      color="red"
    />
  );
};
IssueAssigneeForm.propTypes = {
  projectId: PropTypes.number,
  assignee: PropTypes.string,
  setFn: PropTypes.func,
  disabled: PropTypes.bool,
};

export default IssueAssigneeForm;
