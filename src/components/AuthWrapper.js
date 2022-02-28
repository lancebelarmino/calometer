import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();

  if (currentUser === undefined) return null;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default AuthWrapper;
