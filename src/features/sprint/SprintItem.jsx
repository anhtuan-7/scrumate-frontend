import { IconButton, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { TbEdit } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

import { Button, ExpandablePanel, Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
import IssueCreateForm from '../issue/IssueCreateForm';
import IssueItem from '../issue/IssueItem';
import { useGetBacklogQuery } from '../issue/issueApi';

const SprintItem = ({ sprint }) => {
  const [openForm, setOpenForm] = useState(false);
  const { projectId } = useParams();

  const {
    data: response,
    isFetching,
    error,
  } = useGetBacklogQuery({ projectId, sprintId: sprint.id });

  let content;
  if (isFetching) content = <Skeleton times={3} className="h-8 w-full" />;
  else if (error) FireErrorToast(error);
  else if (response) {
    const { issues } = response.data;
    const issuseList = issues.map((issue) => (
      <IssueItem key={issue.id} issue={issue} />
    ));
    content = (
      <Fragment>
        <div className="flex flex-col gap-3">
          {issuseList}
          {openForm && (
            <IssueCreateForm
              handler={setOpenForm}
              projectId={projectId}
              sprintId={sprint.id}
            />
          )}
          <Button
            className="w-full border-2 border-dashed border-blue-gray-200 p-1 text-blue-gray-500 hover:bg-blue-gray-100/20"
            variant="text"
            ripple={false}
            onClick={() => setOpenForm(true)}
          >
            <div className="flex items-center gap-2">
              <IoIosAddCircleOutline className="text-lg" />
              <Typography className="text-xs">Create issue</Typography>
            </div>
          </Button>
        </div>
      </Fragment>
    );
  }

  const header = (
    <>
      <div className="flex items-center gap-2">
        <Typography color="blue-gray" variant="small">
          {sprint.name}
        </Typography>
        <IconButton size="sm" variant="text" color="blue">
          <TbEdit className="text-xs" />
        </IconButton>
      </div>

      <Typography variant="small" color="blue-gray">
        {sprint.startDate || 'January 01 2024 | 2 Weeks'}
      </Typography>
    </>
  );

  return <ExpandablePanel header={header}>{content}</ExpandablePanel>;
};
SprintItem.propTypes = {
  sprint: PropTypes.object,
};

export default SprintItem;
