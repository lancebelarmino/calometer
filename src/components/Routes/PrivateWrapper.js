import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';
import useOnboarding from '../../hooks/useOnboarding';

const PrivateWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();
  const isOnboarded = useOnboarding();
  const from = location.state?.from?.pathname || '/dashboard';

  if (currentUser === undefined || isOnboarded === undefined) {
    return <Spinner />;
  }

  if (isOnboarded === false && from !== '/onboarding') {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  console.log(from);

  return currentUser ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateWrapper;
