import { useContext } from 'react';
import { Grid, Title, TextInput, PasswordInput, Button, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import AuthContext from '../../context/AuthContext';
import FormSection from '../../components/Form/FormSection';
import FormLink from '../../components/Form/FormLink';
import useStyles from './Register.styles';
import toCapitalize from '../../utils/toCapitalize';

export const Register = () => {
  const { onRegister, errors } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
    },

    errorMessages: {
      email: 'Invalid email',
      password: 'Password is not strong enough',
    },
  });
  const { classes } = useStyles();

  const submitHandler = async (value) => {
    const firstName = toCapitalize(value.firstName);
    const lastName = toCapitalize(value.lastName);
    const defaultData = {
      firstName: firstName,
      lastName: lastName,
      isOnboarded: false,
    };

    onRegister(value.email, value.password, defaultData);
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  if (errors.register) {
    console.log(errors.register);
  }

  return (
    <Grid>
      <Grid.Col md={7} xl={6}>
        <FormSection>
          <Title className={classes.title} order={4}>
            Create your account
          </Title>

          <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
            <SimpleGrid
              className={classes.formRow}
              cols={2}
              spacing={32}
              breakpoints={[{ maxWidth: 1024, cols: 1, spacing: 32 }]}>
              <TextInput label="First Name" onChange={changeHandler} required {...form.getInputProps('firstName')} />
              <TextInput label="Last Name" onChange={changeHandler} required {...form.getInputProps('lastName')} />
            </SimpleGrid>

            <div className={classes.formRow}>
              <TextInput
                label="Email"
                onChange={changeHandler}
                onBlur={() => form.validateField('email')}
                required
                {...form.getInputProps('email')}
              />
            </div>

            <div className={classes.formRowPassword}>
              <PasswordInput
                classNames={{ label: classes.labelPass, description: classes.descPass }}
                label="Password"
                description="Minimum eight characters, at least one letter and one number"
                onChange={changeHandler}
                onBlur={() => {
                  form.validateField('password');
                }}
                required
                {...form.getInputProps('password')}
              />
            </div>

            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </form>

          <FormLink link="/login" message="Have an account?" highlight="Sign in" />
        </FormSection>
      </Grid.Col>
      <Grid.Col className={classes.background} md={5} xl={6} />
    </Grid>
  );
};
