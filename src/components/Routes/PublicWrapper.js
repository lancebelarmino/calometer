import { Navigate, Outlet } from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import useAuth from '../../hooks/useAuth';

const PrivateWrapper = () => {
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <LoadingPage />;
  }

  return currentUser ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PrivateWrapper;
