import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';
import Navbar from './Navbar';
import useAuth from '../../hooks/useAuth';
import { getLocalItem } from '../../utils/localStorage';
import useStyles from './NavbarSection.styles';

const NavbarSection = ({ children }) => {
  const currentUser = useAuth();
  const location = useLocation();
  const { classes, cx } = useStyles();

  const isOnboarded = getLocalItem('isOnboarded');
  const isFetchingUserData = currentUser === 'loading';
  const isLoggedIn = !isFetchingUserData && currentUser !== undefined && currentUser !== null;
  const validPaths = ['/dashboard', '/tracker', '/quotes', '/settings'];
  const isValidPath = validPaths.includes(location.pathname);

  return (
    <div className={cx({ [classes.section]: isValidPath })}>
      {isLoggedIn && isValidPath && isOnboarded && (
        <div>
          <Navbar />
        </div>
      )}

      <ScrollArea className={classes.content} type="auto">
        <div>{children}</div>
      </ScrollArea>
    </div>
  );
};

export default NavbarSection;
