import { IconButton, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { RiMoreLine } from 'react-icons/ri';

import { Drawer } from '../../components';
import { formatPriority, formatType } from '../../utils/formatText';
import IssueUpdateForm from './IssueUpdateForm';

const KanbanIssueItem = ({ issue }) => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <Fragment>
      <Drawer open={openForm} handler={setOpenForm}>
        <IssueUpdateForm issue={issue} />
      </Drawer>
      <div
        key={issue.id}
        className="flex min-w-max cursor-pointer flex-col gap-2 rounded-lg border-2 border-blue-gray-200 p-2 hover:border-blue-200"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {formatType(issue.type)}
            <div className=" w-44 break-words">{issue.title}</div>
          </div>

          <IconButton
            variant="text"
            size="sm"
            onClick={() => setOpenForm(true)}
          >
            <RiMoreLine className="text-lg" />
          </IconButton>
        </div>

        <div className="flex items-center gap-1">
          <Typography className="inline" variant="small">
            Priority:{' '}
          </Typography>
          {formatPriority(issue.priority)}
        </div>
      </div>
    </Fragment>
  );
};
KanbanIssueItem.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default KanbanIssueItem;
