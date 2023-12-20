import { Typography } from '@material-tailwind/react';
import { Fragment, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import { Button, Skeleton } from '../../components';
import ExpandablePanel from '../../components/ExpandablePanel';
import { FireErrorToast } from '../../components/Toast';
import IssueCreateForm from '../issue/IssueCreateForm';
import IssueItem from '../issue/IssueItem';
import { useGetBacklogQuery } from '../issue/issueApi';
import SprintList from '../sprint/SprintList';

const Backlog = () => {
  const [openForm, setOpenForm] = useState(false);
  const { projectId } = useParams();
  const {
    data: response,
    isFetching,
    error,
  } = useGetBacklogQuery({ projectId });

  let content;
  if (isFetching) content = <Skeleton times={4} className="h-10 w-full" />;
  else if (error) FireErrorToast(error);
  else if (response) {
    const { issues } = response.data;
    const issuseList = issues.map((issue) => (
      <IssueItem key={issue.id} issue={issue} />
    ));
    content = (
      <Fragment>
        <div className="mb-4 flex flex-col gap-3">
          {issuseList}
          {openForm && (
            <IssueCreateForm
              handler={setOpenForm}
              projectId={parseInt(projectId)}
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

  return (
    <div className="flex w-full min-w-max flex-col gap-3 p-6">
      <SprintList />
      <ExpandablePanel
        header={
          <Typography color="blue" variant="small">
            Product Backlog
          </Typography>
        }
        defaultOpen={true}
      >
        {content}
      </ExpandablePanel>
      <hr className="mt-12" />
    </div>
  );
};

export default Backlog;
