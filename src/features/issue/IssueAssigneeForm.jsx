import { Option, Select, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';

const IssueAssigneeForm = ({ reporter, assignee, setFn, disabled }) => {
  // TO-DO: Get user list in project
  // TO-DO: Render user options
  return (
    <Select
      labelProps={{ className: 'hidden' }}
      className="!border !border-gray-500"
      onChange={(value) => setFn(value)}
      selected={(element) =>
        element &&
        cloneElement(element, {
          disabled: true,
          className:
            'flex items-center opacity-100 px-0 gap-2 pointer-events-none',
        })
      }
      value={assignee}
      disabled={disabled}
    >
      <Option value={reporter.id.toString()}>
        <div>
          <Typography className="text-xs">{reporter.name}</Typography>
          <Typography className="text-xs">{reporter.email}</Typography>
        </div>
      </Option>
      <Option value="">
        <Typography variant="small">None</Typography>
      </Option>
    </Select>
  );
};
IssueAssigneeForm.propTypes = {
  reporter: PropTypes.object,
  assignee: PropTypes.string,
  setFn: PropTypes.func,
  disabled: PropTypes.bool,
};

export default IssueAssigneeForm;
