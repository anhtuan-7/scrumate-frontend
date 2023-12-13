import { Chip } from '@material-tailwind/react';
import { HiOutlinePresentationChartBar } from 'react-icons/hi2';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { PiKanban } from 'react-icons/pi';
import { TfiDashboard } from 'react-icons/tfi';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';
import Sidebar from '../../components/Sidebar';
import SidebarLink from '../../components/SidebarLink';
import { FireErrorToast } from '../../components/Toast';
import MainLayout from '../../layouts/MainLayout';
import { useGetProjectQuery } from './projectApi';

const ProjectLayout = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data, isFetching, error } = useGetProjectQuery({ projectId });

  if (isFetching) return <LoadingScreen />;
  else if (error) {
    FireErrorToast(error);
    navigate(-1);
  } else if (data) {
    const { project } = data.data;
    return (
      <MainLayout>
        <Sidebar
          title={project.name}
          role={
            <Chip value={project.projectUser.role} color="blue" size="sm" />
          }
        >
          <SidebarLink
            url={`/projects/${project.id}/backlog`}
            icon={<HiOutlinePresentationChartBar className="h-5 w-5" />}
            text="Backlog"
          />
          <SidebarLink
            url={`/projects/${project.id}/my-work`}
            icon={<PiKanban className="h-5 w-5" />}
            text="Board"
          />
          <SidebarLink
            url={`/projects/${project.id}/dashboard`}
            icon={<TfiDashboard className="h-5 w-5" />}
            text="Dashboard"
          />
          <SidebarLink
            url={`/projects/${project.id}/members`}
            icon={<IoPeopleOutline className="h-5 w-5" />}
            text="Member"
          />
          <SidebarLink
            url={`/projects/${project.id}/setting`}
            icon={<IoSettingsOutline className="h-5 w-5" />}
            text="Setting"
          />
        </Sidebar>
        <Outlet context={project} />
      </MainLayout>
    );
  }
};

export default ProjectLayout;
