import { useContext } from 'react';
import { Title, TextInput, PasswordInput, Button, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import AuthContext from '../../context/AuthContext';
import FormSection from '../../components/Form/FormSection';
import FormLink from '../../components/Form/FormLink';
import toCapitalize from '../../utils/toCapitalize';
import getRandomColor from '../../utils/getRandomColor';
import getInitials from '../../utils/getInitials';
import { setLocalItem } from '../../utils/localStorage';
import useStyles from './Register.styles';

export const Register = () => {
  const { onRegister } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (value === '' ? null : /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value === ''
          ? null
          : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : 'Password is not strong enough',
    },
  });
  const { classes } = useStyles();

  const submitHandler = (value) => {
    const firstName = toCapitalize(value.firstName);
    const lastName = toCapitalize(value.lastName);
    const defaultData = {
      firstName: firstName,
      lastName: lastName,
      isOnboarded: false,
      profilePicture: {
        url: false,
        defaultColor: getRandomColor(),
        initials: getInitials(firstName, lastName),
      },
    };

    onRegister(value.email, value.password, defaultData, form.setFieldError);

    setLocalItem('profile_picture', defaultData.profilePicture);
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  return (
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

        <div className={classes.formRow}>
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
  );
};
