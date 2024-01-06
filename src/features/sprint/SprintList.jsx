import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
import unwrapMutation from '../../utils/unwrapMutation';
import SprintItem from './SprintItem';
import { useCreateSprintMutation, useGetSprintListQuery } from './sprintApi';

const SprintList = ({ provided }) => {
  const sprintsNumber = useRef(0);
  const { projectId } = useParams();
  const [createSprint, { isLoading }] = useCreateSprintMutation();
  const {
    data: result,
    isFetching,
    error,
  } = useGetSprintListQuery({ projectId });

  const handleCreate = () => {
    unwrapMutation(
      createSprint,
      { projectId, sprintsNumber: sprintsNumber.current + 1 },
      'Create New Sprint Successfully',
    );
  };

  if (error) {
    FireErrorToast(error);
  } else if (isFetching) {
    return <Skeleton times={3} className="h-8 w-full" />;
  } else if (result) {
    const { sprints } = result.data;
    sprintsNumber.current = sprints.length;

    const renderedSprints = sprints.map((sprint) => (
      <SprintItem key={sprint.id} sprint={sprint} provided={provided} />
    ));

    return (
      <div className="w-full">
        <Button
          color="blue"
          size="sm"
          onClick={handleCreate}
          isLoading={isLoading}
        >
          Create Sprint
        </Button>
        <div className="mt-6 flex flex-col gap-3">{renderedSprints}</div>
      </div>
    );
  }
};
SprintList.propTypes = {
  provided: PropTypes.object,
};

export default SprintList;
