import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Title, TextInput, PasswordInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import AuthContext from '../../context/AuthContext';
import FormSection from '../../components/Form/FormSection';
import FormLink from '../../components/Form/FormLink';
import useStyles from './Login.styles';

export const Login = () => {
  const { onLogin, from } = useContext(AuthContext);
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

  const submitHandler = async (value) => {
    onLogin(value.email, value.password, from);
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  return (
    <FormSection title="Sign in your account">
      <Title className={classes.title} order={4}>
        Sign in your account
      </Title>

      <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
        <div className={classes.formRow}>
          <TextInput id="email" label="Email" onChange={changeHandler} {...form.getInputProps('email', 'error')} />
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
  );
};
