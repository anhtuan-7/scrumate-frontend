import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

const AppList = () => {
  return (
    <div className="w-full min-h-screen overflow-x-scroll">
      <div className="flex flex-col items-center text-blue-gray-900">
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppList;
