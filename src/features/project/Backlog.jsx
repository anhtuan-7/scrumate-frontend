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
    const issuseList = issues.map((issue) => <IssueItem key={issue.id} />);
    content = (
      <Fragment>
        {issuseList}
        <Button
          className="w-full border-2 border-dashed border-blue-gray-200 p-2 text-blue-gray-500 hover:bg-blue-gray-100/20"
          variant="text"
        >
          <div className="flex items-center gap-2">
            <IoIosAddCircleOutline className="text-lg" />
            <Typography variant="small">New issue</Typography>
          </div>
        </Button>
      </Fragment>
    );
  }

  return (
    <div className="flex w-full flex-col p-6">
      <ExpandablePanel header={<Typography>Product Backlog</Typography>}>
        {content}
      </ExpandablePanel>
      <SprintList />
    </div>
  );
};

export default Backlog;
