import { Chip } from '@material-tailwind/react';
import { Fragment } from 'react';
import { GrProjects, GrUserAdmin } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
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
  const { user } = useSelector((state) => state.status);
  const { data, isFetching, error } = useGetGroupQuery({
    userId: user.id,
    groupId,
  });

  if (isFetching) return <LoadingScreen />;
  else if (error) {
    FireErrorToast(error);
    navigate('/');
  } else {
    const { group } = data.data;
    return (
      <MainLayout>
        <Fragment>
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
          <div className="ml-4 grid h-fit w-full min-w-max grid-cols-1 gap-6 p-4 lg:grid-cols-3 xl:grid-cols-4">
            <Outlet />
          </div>
        </Fragment>
      </MainLayout>
    );
  }
};

export default GroupLayout;
