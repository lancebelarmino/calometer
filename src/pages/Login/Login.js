import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Grid, Anchor, Title, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import FormSection from '../../components/Form/FormSection';
import FormLink from '../../components/Form/FormLink';
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
      email: `Invalid email`,
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

  return (
    <Grid>
      <Grid.Col md={7} xl={6}>
        <FormSection title="Sign in your account">
          <Title className={classes.title} order={4}>
            Sign in your account
          </Title>

          <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
            <div className={classes.formRow}>
              <TextInput id="email" label="Email" onChange={changeHandler} {...form.getInputProps('email', 'error')} />
              {/* {form.errors.email && <span className={classes.error}>Invalid email: {form.values.email}</span>} */}
            </div>

            <div className={classes.formRow}>
              <PasswordInput id="password" onChange={changeHandler} label="Password" />
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

          <FormLink link="/register" message="Don’t have an account?" highlight="Sign up" />
        </FormSection>
      </Grid.Col>
      <Grid.Col className={classes.background} md={5} xl={6} />
    </Grid>
  );
};
