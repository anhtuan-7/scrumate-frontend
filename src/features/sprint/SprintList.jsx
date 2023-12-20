import { useParams } from 'react-router-dom';

import { Button, Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
import SprintItem from './SprintItem';
import { useGetSprintListQuery } from './sprintApi';

const SprintList = () => {
  const { projectId } = useParams();
  const {
    data: result,
    isFetching,
    error,
  } = useGetSprintListQuery({ projectId });

  if (error) {
    FireErrorToast(error);
  } else if (isFetching) {
    return <Skeleton times={3} className="h-8 w-full" />;
  } else if (result) {
    const { sprints } = result.data;

    const renderedSprints = sprints.map((sprint) => (
      <SprintItem key={sprint.id} sprint={sprint} />
    ));

    return (
      <div className="w-full">
        <Button color="blue" size="sm">
          Create Sprint
        </Button>
        <div className="mt-6 flex flex-col gap-3">{renderedSprints}</div>
      </div>
    );
  }
};
SprintList.propTypes = {};

export default SprintList;
