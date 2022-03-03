import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import useAuth from '../../hooks/useAuth';

const PublicWrapper = () => {
  const currentUser = useAuth();

  if (currentUser === undefined) {
    return <Spinner />;
  }

  // TODO: check if new user
  // console.log(currentUser);

  return currentUser ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicWrapper;
