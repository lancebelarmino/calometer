import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';

const PrivateWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <Spinner />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateWrapper;
