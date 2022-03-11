import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';
import { getLocalItem } from '../../context/AuthContext';

const PrivateWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();
  const isOnboarded = getLocalItem('isOnboarded');

  console.log(location);

  if (currentUser === undefined) {
    return <Spinner />;
  }

  if (currentUser && isOnboarded === null) {
    return <Spinner />;
  }

  if (isOnboarded && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isOnboarded && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateWrapper;
