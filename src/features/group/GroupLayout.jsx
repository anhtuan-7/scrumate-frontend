import { Chip } from '@material-tailwind/react';
import { GrProjects, GrUserAdmin } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import LoadingScreen from '../../components/LoadingScreen';
import Sidebar from '../../components/Sidebar';
import SidebarLink from '../../components/SidebarLink';
import { FireErrorToast } from '../../components/Toast';
import MainLayout from '../../layouts/MainLayout';
import { useGetGroupQuery } from './groupApi';

const GroupLayout = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { data, isFetching, error } = useGetGroupQuery({ groupId });

  if (isFetching) return <LoadingScreen />;
  else if (error) {
    FireErrorToast(error);
    navigate('/');
  } else if (data) {
    const { group } = data.data;
    return (
      <MainLayout>
        <Sidebar
          title={group.name}
          role={<Chip value={group.groupUser.role} color="blue" size="sm" />}
        >
          <SidebarLink
            url={`/groups/${group.id}/projects`}
            icon={<GrProjects className="h-5 w-5" />}
            text="Projects"
          />
          <SidebarLink
            url={`/groups/${group.id}/members`}
            icon={<GrUserAdmin className="h-5 w-5" />}
            text="Member"
          />
          <SidebarLink
            url={`/groups/${group.id}/setting`}
            icon={<IoSettingsOutline className="h-5 w-5" />}
            text="Setting"
          />
        </Sidebar>
        <div className="ml-4 flex min-h-max w-full flex-col items-center p-4">
          <Outlet context={group} />
        </div>
      </MainLayout>
    );
  }
};

export default GroupLayout;
