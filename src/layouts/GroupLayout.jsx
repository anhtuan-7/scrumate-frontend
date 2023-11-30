import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import MainLayout from './MainLayout';

const GroupLayout = () => {
  return (
    <MainLayout>
      <Fragment>
        <Sidebar title="One Mount"></Sidebar>
        <Outlet />
      </Fragment>
    </MainLayout>
  );
};

export default GroupLayout;
