import { Spinner } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.status);
  if (isLoading) return <Spinner />;
  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;
  return children;
};

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.object,
};

export default ProtectedRoute;
