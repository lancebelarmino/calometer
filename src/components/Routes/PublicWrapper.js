import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';

const PrivateWrapper = () => {
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <Spinner />;
  }

  return currentUser ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PrivateWrapper;
