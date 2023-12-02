import { Fragment } from 'react';
import { GrProjects, GrUserAdmin } from 'react-icons/gr';
import { IoSettingsOutline } from 'react-icons/io5';
import { Outlet, useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import SidebarLink from '../components/SidebarLink';
import MainLayout from './MainLayout';

const GroupLayout = () => {
  const { groupId } = useParams();
  return (
    <MainLayout>
      <Fragment>
        <Sidebar title="Group">
          <SidebarLink
            url={`/groups/${groupId}/projects`}
            icon={<GrProjects className="h-5 w-5" />}
            text="Projects"
          />
          <SidebarLink
            url={`/groups/${groupId}/members`}
            icon={<GrUserAdmin className="h-5 w-5" />}
            text="Member"
          />
          <SidebarLink
            url={`/groups/${groupId}/setting`}
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
};

export default GroupLayout;
