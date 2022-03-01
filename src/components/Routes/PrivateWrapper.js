import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import useAuth from '../../hooks/useAuth';

const PrivateWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();

  if (currentUser === undefined) return <LoadingPage />;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateWrapper;
