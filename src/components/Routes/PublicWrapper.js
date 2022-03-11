import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';

const PublicWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <Spinner />;
  }

  /**
   * If currentUser && !isOnboarded || isOnboarded === null return Spinner or Navigate to onboard
   */

  return currentUser ? <Navigate to="/dashboard" /> : <Outlet state={{ from: location }} />;
};

export default PublicWrapper;
