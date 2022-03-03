import { Container } from '@mantine/core';
import { ReactComponent as Logo } from '../../assets/svg/logo-lg.svg';
import useStyles from './FormSection.styles';

const FormSection = ({ children, title }) => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <Logo className={classes.logo} />
      <div className={classes.section}>
        <div className={classes.wrapper}>{children}</div>
      </div>
    </Container>
  );
};

export default FormSection;
