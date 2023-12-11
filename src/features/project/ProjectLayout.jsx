import { Chip } from '@material-tailwind/react';
import { GoGitBranch } from 'react-icons/go';
import { GrUserAdmin } from 'react-icons/gr';
import { HiBars3, HiOutlinePresentationChartBar } from 'react-icons/hi2';
import { PiKanban } from 'react-icons/pi';
import { TfiDashboard } from 'react-icons/tfi';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import SidebarLink from '../../components/SidebarLink';
import MainLayout from '../../layouts/MainLayout';

const ProjectLayout = () => {
  const project = { id: 1 };

  return (
    <MainLayout>
      <Sidebar
        title="OneHousing"
        role={<Chip value={'Developer'} color="blue" size="sm" />}
      >
        <SidebarLink
          url={`/projects/${project.id}/backlog`}
          icon={<HiOutlinePresentationChartBar className="h-5 w-5" />}
          text="Backlog"
        />
        <SidebarLink
          url={`/projects/${project.id}/sprint`}
          icon={<HiBars3 className="h-5 w-5" />}
          text="Sprint"
        />
        <SidebarLink
          url={`/projects/${project.id}/my-work`}
          icon={<PiKanban className="h-5 w-5" />}
          text="Kanban"
        />
        <SidebarLink
          url={`/projects/${project.id}/dashboard`}
          icon={<TfiDashboard className="h-5 w-5" />}
          text="Dashboard"
        />
        <SidebarLink
          url={`/projects/${project.id}/repository`}
          icon={<GoGitBranch className="h-5 w-5" />}
          text="Repository"
        />
        <SidebarLink
          url={`/projects/${project.id}/members`}
          icon={<GrUserAdmin className="h-5 w-5" />}
          text="Member"
        />
      </Sidebar>
      <Outlet />
    </MainLayout>
  );
};

export default ProjectLayout;
