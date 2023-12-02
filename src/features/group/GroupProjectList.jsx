import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Skeleton from '../../components/Skeleton';
import Toast from '../../components/Toast';
import ProjectItem from '../project/projectItem';
import { useGetGroupQuery } from './groupApi';

const GroupProjectList = () => {
  const { groupId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { data, isFetching, error } = useGetGroupQuery({
    userId: user.id,
    groupId: groupId,
  });

  let content;
  if (isFetching) content = <Skeleton times={10} className="h-8 w-full" />;
  else if (error) {
    Toast.fire({
      icon: 'error',
      title: error.data.message,
    });
  } else if (data) {
    const { group } = data.data;
    content = group.projects.map((project) => (
      <ProjectItem key={project.id} project={project} />
    ));
  }

  return <Fragment>{content}</Fragment>;
};

export default GroupProjectList;
