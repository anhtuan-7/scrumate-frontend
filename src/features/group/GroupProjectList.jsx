import { Typography } from '@material-tailwind/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Skeleton from '../../components/Skeleton';
import Toast from '../../components/Toast';
import { useGetProjectListQuery } from '../project/projectApi';
import ProjectItem from '../project/projectItem';

const GroupProjectList = () => {
  const { groupId } = useParams();
  const { user } = useSelector((state) => state.status);
  const { data, isFetching, error } = useGetProjectListQuery({
    userId: user.id,
    groupId: groupId,
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

  return <Fragment>{content}</Fragment>;
};

export default GroupProjectList;
