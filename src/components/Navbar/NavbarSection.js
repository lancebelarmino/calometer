import Navbar from './Navbar';
import useStyles from './NavbarSection.styles';

const NavbarSection = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.section}>
      <Navbar />
      {children}
    </div>
  );
};

export default NavbarSection;
