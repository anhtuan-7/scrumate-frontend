import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Skeleton from '../../components/Skeleton';
import Toast from '../../components/Toast';
import { useGetProjectListQuery } from './projectApi';
import ProjectItem from './projectItem';

const ProjectList = () => {
  const { user } = useSelector((state) => state.status);
  const { data, isFetching, error } = useGetProjectListQuery({
    userId: user.id,
  });

  let content;
  if (isFetching)
    content = (
      <Fragment>
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
      </Fragment>
    );
  else if (error) {
    Toast.fire({
      icon: 'error',
      title: error.data.message,
    });
  } else if (data) {
    const { projects } = data.data;
    if (projects.length === 0)
      content = (
        <Typography>You are not a member of any projects yet</Typography>
      );
    else
      content = projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ));
  }
  return (
    <div className="ml-4 grid h-fit w-full min-w-max grid-cols-1 gap-6 p-4 lg:grid-cols-3 xl:grid-cols-4">
      {content}
    </div>
  );
};

export default ProjectList;
