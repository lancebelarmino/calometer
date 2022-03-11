import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';

const PublicWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <Spinner />;
  }

  return currentUser ? <Navigate to="/dashboard" /> : <Outlet state={{ from: location }} />;
};

export default PublicWrapper;
