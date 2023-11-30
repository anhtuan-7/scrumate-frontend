import { GrGroup, GrProjects } from 'react-icons/gr';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import SidebarLink from '../components/SidebarLink';
import MainLayout from '../layouts/MainLayout';

const AppList = () => {
  return (
    <MainLayout>
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
    </MainLayout>
  );
};

export default AppList;
