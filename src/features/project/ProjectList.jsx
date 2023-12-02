import Skeleton from '../../components/Skeleton';
import Toast from '../../components/Toast';
import { useGetProjectListQuery } from './projectApi';
import ProjectItem from './projectItem';

const ProjectList = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { data, isFetching, error } = useGetProjectListQuery({
    userId: user.id,
  });

  let content;
  if (isFetching) content = <Skeleton times={10} className="h-8 w-full" />;
  else if (error) {
    Toast.fire({
      icon: 'error',
      title: error.data.message,
    });
  } else if (data) {
    const { projects } = data.data;
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
