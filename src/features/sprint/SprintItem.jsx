import { IconButton, Typography } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoPlayOutline, IoStopOutline } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Button, ExpandablePanel, Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
import formatISODate from '../../utils/dateFormat';
import unwrapMutation from '../../utils/unwrapMutation';
import IssueCreateForm from '../issue/IssueCreateForm';
import IssueItem from '../issue/IssueItem';
import { useGetBacklogQuery } from '../issue/issueApi';
import { useCompleteSprintMutation, useStartSprintMutation } from './sprintApi';

const SprintItem = ({ sprint }) => {
  const [openForm, setOpenForm] = useState(false);
  const { projectId } = useParams();

  const {
    data: response,
    isFetching,
    error,
  } = useGetBacklogQuery({ projectId, sprintId: sprint.id });

  const [startSprint] = useStartSprintMutation();
  const [completeSprint] = useCompleteSprintMutation();

  const handleStart = async () => {
    const { value: duration } = await Swal.fire({
      title: 'Select sprint duration',
      text: `Start date: ${formatISODate(new Date())}`,
      input: 'select',
      inputOptions: {
        1: '1 Week',
        2: '2 Weeks',
        4: '4 Weeks',
      },
      showCancelButton: true,
    });

    if (duration) {
      unwrapMutation(
        startSprint,
        {
          projectId,
          sprintId: sprint.id,
          startDate: new Date(),
          duration,
        },
        'Start sprint successfully',
      );
    }
  };

  const handleComplete = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you intend to finish the sprint and transfer any remaining tasks to the backlog?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Complete Sprint',
    }).then((result) => {
      if (result.isConfirmed) {
        unwrapMutation(
          completeSprint,
          {
            projectId,
            sprintId: sprint.id,
          },
          'Successfully',
        );
      }
    });
  };

  let content;
  if (isFetching) content = <Skeleton times={3} className="h-8 w-full" />;
  else if (error) FireErrorToast(error);
  else if (response) {
    const { issues } = response.data;
    const issuseList = issues.map((issue, index) => (
      <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
        {(provided) => <IssueItem issue={issue} provided={provided} />}
      </Draggable>
    ));
    content = (
      <Fragment>
        <div className="flex flex-col gap-3">
          <div>
            {sprint.startDate && (
              <Typography>
                <span className="mr-2 text-red-700">Deadline:</span>
                {formatISODate(
                  new Date(
                    new Date(sprint.startDate).getTime() +
                      sprint.duration * 604800000,
                  ),
                )}
              </Typography>
            )}
            <Typography>
              Sprint Goal:{' '}
              {sprint.sprintGoal || (
                <span className="text-sm text-gray-600">Not specified yet</span>
              )}
            </Typography>
            <Typography></Typography>
          </div>
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
    <div className="flex items-center gap-3">
      <Typography color={sprint.active ? 'blue' : 'blue-gray'}>
        {sprint.name}
      </Typography>
      <div className="flex">
        <IconButton size="sm" variant="text" color="blue">
          <TbEdit className="text-sm" />
        </IconButton>
        {sprint.active ? (
          <Button
            size="sm"
            variant="text"
            color="pink"
            className="py-0"
            onClick={handleComplete}
          >
            <div className="flex items-center gap-1">
              <IoStopOutline className="text-sm" />
              <span className="items-center text-xs font-light">Complete</span>
            </div>
          </Button>
        ) : (
          <Button
            size="sm"
            variant="text"
            color="blue"
            className="py-0"
            onClick={handleStart}
          >
            <div className="flex items-center gap-1">
              <IoPlayOutline className="text-sm" />
              <span className="items-center text-xs font-light">Start</span>
            </div>
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ExpandablePanel header={header} droppableId={sprint.id.toString()}>
      {content}
    </ExpandablePanel>
  );
};
SprintItem.propTypes = {
  sprint: PropTypes.object,
};

export default SprintItem;
