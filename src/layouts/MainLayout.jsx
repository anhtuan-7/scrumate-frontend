import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center text-blue-gray-900">
      <Navbar />
      <div className="flex h-full w-full overflow-auto px-6">{children}</div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;
