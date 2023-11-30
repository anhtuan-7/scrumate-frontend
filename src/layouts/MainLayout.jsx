import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-scroll">
      <div className="flex flex-col items-center text-blue-gray-900">
        <Navbar />
        <div className="flex w-full overflow-auto px-6">{children}</div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object,
};

export default MainLayout;
