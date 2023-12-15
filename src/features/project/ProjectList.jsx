import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Skeleton from '../../components/Skeleton';
import { FireErrorToast } from '../../components/Toast';
import { useGetProjectListQuery } from './projectApi';
import ProjectItem from './projectItem';

const ProjectList = () => {
  const { user } = useSelector((state) => state.status);
  const { data, isFetching, error } = useGetProjectListQuery({
    userId: user.id,
  });

  if (isFetching)
    return (
      <Fragment>
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
        <Skeleton times={1} className="h-64 w-full" />
      </Fragment>
    );
  else if (error) FireErrorToast(error);
  else if (data) {
    const { projects } = data.data;
    if (projects.length === 0)
      return (
        <Typography className="p-3">
          You are not a member of any projects yet
        </Typography>
      );
    else {
      const rederedProjects = projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ));
      return (
        <div className="ml-4 grid h-fit grid-cols-1 gap-6 p-4 lg:grid-cols-3 xl:grid-cols-4">
          {rederedProjects}
        </div>
      );
    }
  }
};

export default ProjectList;
