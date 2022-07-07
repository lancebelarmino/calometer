import { useEffect, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../context/AuthContext';
import { getLocalItem } from '../../utils/localStorage';

const PrivateWrapper = () => {
  const location = useLocation();
  const currentUser = useAuth();
  const { setFrom } = useContext(AuthContext);

  const isOnboarded = getLocalItem('isOnboarded');
  const isFetchingUserData = currentUser === 'loading';
  const isLoggedIn = !isFetchingUserData && currentUser !== undefined && currentUser !== null;
  const isCurrentPageOnboarding = location.pathname === '/onboarding';
  const isCurrentPageDashboard = location.pathname === '/dashboard';

  /**
   * Send user back to the page they tried to access
   */
  useEffect(() => {
    setFrom(location.pathname);
  }, [location.pathname, setFrom]);

  /**
   * Show suspense fallback spinner while getting data
   */
  if (isFetchingUserData) {
    // console.log('Private: loading');

    return;
  }

  /**
   * Redirect to onboarding if new user
   */
  if (isLoggedIn && !isOnboarded && !isCurrentPageOnboarding) {
    // console.log('Private: Going to onboarding page');

    return <Navigate to="/onboarding" />;
  }

  /**
   * Redirect to dashboard if onboarded user
   */
  if (isLoggedIn && isCurrentPageOnboarding && isOnboarded && !isCurrentPageDashboard) {
    // console.log('Private: Going to dashboard page');

    return <Navigate to="/dashboard" />;
  }

  /**
   * Redirect to login if not logged in
   * !isCurrentPageOnboarding - Don't redirect if from /register -> /onboarding
   */
  if (!isCurrentPageOnboarding && !isLoggedIn) {
    // console.log('Private: Going to login page');

    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // console.log('Private: Going to a private page');

  return <Outlet />;
};

export default PrivateWrapper;
