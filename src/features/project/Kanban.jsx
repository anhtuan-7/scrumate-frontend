// import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import { Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
import unwrapMutation from '../../utils/unwrapMutation';
import KanbanIssueItem from '../issue/KanbanIssueItem';
import { useUpdateIssueMutation } from '../issue/issueApi';
import { useGetKanbanBoardQuery } from './projectApi';

const Kanban = () => {
  const { projectId } = useParams();
  const {
    data: response,
    isFetching,
    error,
  } = useGetKanbanBoardQuery({
    projectId,
  });

  const [updateIssue] = useUpdateIssueMutation();

  const columns = {
    'to-do': [],
    'in-progress': [],
    done: [],
  };

  const handleDragDrop = (result) => {
    unwrapMutation(
      updateIssue,
      {
        status: result.destination.droppableId,
        projectId,
        issueId: result.draggableId * 1,
      },
      'Update Issue Successfully',
    );
  };

  const renderedColumn = (header, column, status) => (
    <div className="mt-3 w-1/4 min-w-fit rounded-xl border-2 border-gray-400 p-3">
      <Typography className="w-56 p-1" variant="h5" color="blue-gray">
        {header}
      </Typography>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="flex flex-col gap-3 border-t-2 border-blue-300 py-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {column.map((issue, index) => (
              <Draggable
                key={issue.id}
                draggableId={issue.id.toString()}
                index={index}
              >
                {(provided) => (
                  <KanbanIssueItem
                    issue={issue}
                    provided={provided}
                    forwardRef={provided.innerRef}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
  let content;
  if (isFetching)
    content = (
      <Fragment>
        <Skeleton times={1} className="h-96 w-64" />
        <Skeleton times={1} className="h-96 w-64" />
        <Skeleton times={1} className="h-96 w-64" />
      </Fragment>
    );
  else if (error) FireErrorToast(error);
  else if (response) {
    const { issues } = response.data;
    issues.forEach((issue) => {
      columns[issue.status].push(issue);
    });

    content = (
      <Fragment>
        {renderedColumn('To do', columns['to-do'], 'to-do')}
        {renderedColumn('In Progress', columns['in-progress'], 'in-progress')}
        {renderedColumn('Done', columns['done'], 'done')}
      </Fragment>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div className="flex w-full gap-12">{content}</div>
    </DragDropContext>
  );
};
Kanban.propTypes = {};

export default Kanban;
