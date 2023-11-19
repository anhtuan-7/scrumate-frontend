import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ProjectSidebar from '../features/project/ProjectSidebar';

const ProjectLayout = () => {
  return (
    <div className="w-full">
      <div className="flex min-h-screen flex-col items-center overflow-x-scroll text-blue-gray-900">
        <Navbar />
        <div className="flex w-full">
          <ProjectSidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
