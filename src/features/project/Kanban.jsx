// import PropTypes from 'prop-types';
import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';

import { Skeleton } from '../../components';
import { FireErrorToast } from '../../components/Toast';
import KanbanIssueItem from '../issue/KanbanIssueItem';
import { useGetKanbanBoardQuery } from './projectApi';

const Kanban = () => {
  const {
    data: response,
    isFetching,
    error,
  } = useGetKanbanBoardQuery({
    projectId: 1,
  });

  const columns = {
    'to-do': [],
    'in-progress': [],
    done: [],
  };

  const renderedColumn = (header, column) => (
    <div className="mt-3 w-1/4 min-w-fit rounded-xl border-2 border-gray-400 p-3">
      <Typography className="w-56 p-1" variant="h5" color="blue-gray">
        {header}
      </Typography>
      <div className="flex flex-col gap-3 border-t-2 border-blue-300 py-3">
        {column.map((issue) => (
          <KanbanIssueItem key={issue.id} issue={issue} />
        ))}
      </div>
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
        {renderedColumn('To do', columns['to-do'])}
        {renderedColumn('In Progress', columns['in-progress'])}
        {renderedColumn('Done', columns['done'])}
      </Fragment>
    );
  }

  return <div className="flex w-full gap-12">{content}</div>;
};
Kanban.propTypes = {};

export default Kanban;
