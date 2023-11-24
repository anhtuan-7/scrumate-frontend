import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.status);
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;
