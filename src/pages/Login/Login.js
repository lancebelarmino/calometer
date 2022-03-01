import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Grid, Anchor, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import FormSection from '../../components/Sections/FormSection';
import useStyles from './Login.styles';

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },

    errorMessages: {
      email: 'Invalid email',
    },
  });
  const { classes } = useStyles();

  const from = location.state?.from?.pathname || '/dashboard';

  const submitHandler = async (value) => {
    try {
      const user = await signInWithEmailAndPassword(auth, value.email, value.password);
      console.log(user);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  const blurHandler = (e) => {
    form.validateField(e.target.id);
  };

  return (
    <Grid>
      <Grid.Col span={6}>
        <FormSection title="Sign in your account">
          <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
            <div className={classes.formRow}>
              <TextInput
                id="email"
                label="Email"
                onChange={changeHandler}
                onBlur={blurHandler}
                {...form.getInputProps('email')}
              />
            </div>

            <div className={classes.formRow}>
              <PasswordInput id="password" className={classes.password} onChange={changeHandler} label="Password" />
              <div className={classes.forgot}>
                <Anchor className={classes.forgotLink} component={Link} to="/reset">
                  Forgot Password?
                </Anchor>
              </div>
            </div>

            <Button type="submit" fullWidth>
              Sign In
            </Button>
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
