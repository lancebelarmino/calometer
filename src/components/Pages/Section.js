import useStyles from './Section.styles';

const Section = ({ children, className }) => {
  const { classes, cx } = useStyles();

  return <div className={cx(classes.container, className)}>{children}</div>;
};

export default Section;
