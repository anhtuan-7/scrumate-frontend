import { GrGroup, GrProjects } from 'react-icons/gr';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SidebarLink from '../components/SidebarLink';

const AppList = () => {
  return (
    <div className="min-h-screen w-full overflow-x-scroll">
      <div className="flex flex-col items-center text-blue-gray-900">
        <Navbar />
        <div className="flex w-full overflow-auto px-6">
          <Sidebar title="Index">
            <SidebarLink
              url="/app/groups"
              icon={<GrGroup className="h-5 w-5" />}
              text="Groups"
            />
            <SidebarLink
              url="/app/projects"
              icon={<GrProjects className="h-5 w-5" />}
              text="Projects"
            />
          </Sidebar>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppList;
