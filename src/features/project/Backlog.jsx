import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import Button from '../../components/Button';
import ExpandablePanel from '../../components/ExpandablePanel';
import Skeleton from '../../components/Skeleton';
import { FireErrorToast } from '../../components/Toast';
import IssueItem from '../issue/IssueItem';
import { useGetBacklogQuery } from '../issue/issueApi';
import SprintList from '../sprint/SprintList';

const Backlog = () => {
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
        <div className="mb-4 flex flex-col gap-3">{issuseList}</div>
        <Button
          className="w-full border-2 border-dashed border-blue-gray-200 p-2 text-blue-gray-500 hover:bg-blue-gray-100/20"
          variant="text"
        >
          <div className="flex items-center gap-2">
            <IoIosAddCircleOutline className="text-lg" />
            <Typography variant="small">Create issue</Typography>
          </div>
        </Button>
      </Fragment>
    );
  }

  return (
    <div className="max-w-srceen flex w-full min-w-max flex-col gap-6 p-6">
      <SprintList />
      <ExpandablePanel
        header={<Typography>Product Backlog</Typography>}
        defaultOpen={true}
      >
        {content}
      </ExpandablePanel>
    </div>
  );
};

export default Backlog;
