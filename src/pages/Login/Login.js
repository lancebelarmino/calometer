import { useLocation, Link } from 'react-router-dom';
import { Grid, Anchor, TextInput, PasswordInput, Button } from '@mantine/core';
import FormSection from '../../components/Sections/FormSection';
import useStyles from './Login.styles';

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const { classes } = useStyles();

  return (
    <Grid>
      <Grid.Col span={6}>
        <FormSection title="Sign in your account">
          <form className={classes.form}>
            <TextInput className={classes.email} label="Email" />
            <PasswordInput className={classes.password} label="Password" />
            <div className={classes.forgot}>
              <Anchor component={Link} to="/reset">
                Forgot Password?
              </Anchor>
            </div>

            <Button fullWidth>Sign In</Button>
          </form>

          <div className={classes.register}>
            <Anchor component={Link} to="/register">
              Don’t have an account?
              <span className={classes.signup}> Sign up</span>
            </Anchor>
          </div>
        </FormSection>
      </Grid.Col>
      <Grid.Col className={classes.background} span={6} />
    </Grid>
  );
};

export default Login;
