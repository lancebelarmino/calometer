import { useLocation } from 'react-router-dom';
import { ScrollArea } from '@mantine/core';
import Navbar from './Navbar';
import useStyles from './NavbarSection.styles';

const NavbarSection = ({ children }) => {
  const location = useLocation();
  const { classes, cx } = useStyles();

  const validPaths = ['/dashboard', '/tracker', '/quotes', '/settings'];
  const isValidPath = validPaths.includes(location.pathname);

  return (
    <div className={cx({ [classes.section]: isValidPath })}>
      <div>{isValidPath && <Navbar />}</div>
      <ScrollArea className={classes.content} type="auto">
        <div>{children}</div>
      </ScrollArea>
    </div>
  );
};

export default NavbarSection;
