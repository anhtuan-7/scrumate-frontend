import { useParams } from 'react-router-dom';

import { Button, Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
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
    return <Skeleton times={4} className="h-10 w-full" />;
  } else if (result) {
    const { sprints } = result.data;
    return (
      <div className="w-full">
        <div>
          <Button color="blue" size="sm">
            Create Sprint
          </Button>
        </div>
        {sprints.length}
      </div>
    );
  }
};
SprintList.propTypes = {};

export default SprintList;
