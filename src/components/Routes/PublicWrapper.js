import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';

const PublicWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();
  const from = location.state?.from?.pathname || '/dashboard';

  if (currentUser === undefined) {
    return <Spinner />;
  }

  if (from === '/register') {
    return <Navigate to="/onboarding" />;
  }

  return currentUser ? <Navigate to="/dashboard" /> : <Outlet state={{ from: location }} />;
};

export default PublicWrapper;
