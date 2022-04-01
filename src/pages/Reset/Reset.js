import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, TextInput, Button, UnstyledButton } from '@mantine/core';
import { useForm } from '@mantine/form';
import AuthContext from '../../context/AuthContext';
import FormSection from '../../components/Form/FormSection';
import FormLink from '../../components/Form/FormLink';
import { ReactComponent as EmailSentIcon } from '../../assets/svg/email-sent.svg';
import useStyles from './Reset.styles';

export const Reset = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { onReset } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (value === '' ? null : /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const { classes } = useStyles();

  const submitHandler = (value) => {
    onReset(
      value.email,
      () => {
        setIsSubmitted(true);
      },
      form.setFieldError
    );
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  const resendHandler = (e) => {
    setIsSubmitted(false);
  };

  const loginHandler = (e) => {
    navigate('/login');
  };

  const formSection = (
    <>
      <div className={classes.header}>
        <Title className={classes.title} order={4}>
          Reset password
        </Title>

        <Text>Enter your registered email below and we'll send you a link to reset your password.</Text>
      </div>

      <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
        <div className={classes.formRow}>
          <TextInput
            label="Email"
            value={form.values.email}
            onChange={changeHandler}
            onBlur={() => form.validateField('email')}
            required
            {...form.getInputProps('email')}
          />
        </div>

        <Button type="submit" fullWidth>
          Send
        </Button>
      </form>
      <FormLink link="/login" message="Remember your password?" highlight="Log in" />
    </>
  );

  const successSection = (
    <>
      <div className={classes.header}>
        <Title className={classes.title} order={4}>
          Check your email
        </Title>

        <Text>Please check your inbox, we sent you a reset link.</Text>
      </div>

      <EmailSentIcon className={classes.emailIcon} />

      <Button className={classes.successBtn} onClick={loginHandler} fullWidth>
        Back to login
      </Button>

      <UnstyledButton className={classes.resendBtn} onClick={resendHandler}>
        Didn't receive anything? <span className={classes.highlight}>Resend email</span>
      </UnstyledButton>
    </>
  );

  return <FormSection>{isSubmitted ? successSection : formSection}</FormSection>;
};
