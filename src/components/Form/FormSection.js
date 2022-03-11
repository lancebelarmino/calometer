import { Container, Grid } from '@mantine/core';
import { ReactComponent as Logo } from '../../assets/svg/logo-lg.svg';
import useStyles from './FormSection.styles';

const FormSection = ({ children, title }) => {
  const { classes } = useStyles();

  return (
    <Grid>
      <Grid.Col md={7} xl={6}>
        <Container className={classes.container}>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.section}>
            <div className={classes.wrapper}>{children}</div>
          </div>
        </Container>
      </Grid.Col>
      <Grid.Col className={classes.background} md={5} xl={6} />
    </Grid>
  );
};

export default FormSection;
