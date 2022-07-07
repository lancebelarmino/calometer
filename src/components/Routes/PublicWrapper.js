import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { getLocalItem } from '../../utils/localStorage';

const PublicWrapper = () => {
  const currentUser = useAuth();

  const isOnboarded = getLocalItem('isOnboarded');
  const isFetchingUserData = currentUser === 'loading';
  const isLoggedIn = !isFetchingUserData && currentUser !== undefined && currentUser !== null;

  /**
   * Show suspense fallback spinner while getting data
   */
  if (isFetchingUserData) {
    // console.log('Public: loading');

    return;
  }

  /**
   * Redirect user to dashboard if logged in
   */
  if (isLoggedIn && isOnboarded) {
    // console.log('Public: Going dashboard');

    return <Navigate to="/dashboard" />;
  }

  /**
   * Redirect user to onboarding if logged in and not onboarded
   */
  if (isLoggedIn && !isOnboarded) {
    // console.log('Public: Going dashboard');

    return <Navigate to="/onboarding" />;
  }

  // console.log('Public: Going to a public page');

  return <Outlet />;
};

export default PublicWrapper;
