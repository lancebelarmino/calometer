import React, { useState, useContext } from 'react';
import { Title, Text, Divider, PasswordInput, Group, Button, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import Card from '../Pages/Card';
import { ReactComponent as Success } from '../../assets/svg/settings-success.svg';
import useStyles from './SettingsPassword.styles';

const sectionVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      ease: 'easeIn',
      duration: 0.2,
    },
  },

  exit: {
    opacity: 0,
  },
};

const SettingsPassword = ({ ...props }) => {
  const { onChangePassword } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isSuccessfulChange, setIsSuccessfulChange] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    validate: {
      newPassword: (value) =>
        value === ''
          ? null
          : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? null
          : 'Password is not strong enough',
      confirmPassword: (value) => (value !== form.values.newPassword ? 'Password is not the same' : null),
    },
  });

  const { classes, cx } = useStyles();

  const inputBlurHandler = (e) => {
    form.validateField(e.target.id);
  };

  const inputChangeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);

    if (isEditing === false) {
      setIsEditing(true);
    }
  };

  const submitFormHandler = (values) => {
    const onSuccessfulChange = () => {
      setIsSuccessfulChange(true);

      setTimeout(() => setIsSuccessfulChange(false), 1500);
    };

    onChangePassword(values, onSuccessfulChange, form.setFieldError);
    setIsEditing(false);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    form.reset();
  };

  return (
    <Card {...props} layout>
      <motion.div className={classes.header} layout="position">
        <Title className={classes.headerTitle} order={5}>
          Password
        </Title>
        <Text>Update your password</Text>
      </motion.div>

      <Divider className={classes.divider} component={motion.div} layout="position" />

      <motion.form className={classes.form} onSubmit={form.onSubmit(submitFormHandler)} layout="position">
        <motion.div className={classes.formRow} layout="position">
          <PasswordInput
            id="currentPassword"
            label="Current Password"
            value={form.values.currentPassword}
            onChange={inputChangeHandler}
            error={form.errors.currentPassword}
          />
        </motion.div>

        <motion.div className={classes.formRow} layout="position">
          <PasswordInput
            id="newPassword"
            label="New Password"
            value={form.values.newPassword}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            error={form.errors.newPassword}
          />
        </motion.div>

        <motion.div className={classes.formRow} layout="position">
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={form.values.confirmPassword}
            onChange={inputChangeHandler}
            onBlur={inputBlurHandler}
            error={form.errors.confirmPassword}
          />
        </motion.div>

        {isEditing && (
          <Group
            className={classes.formSubmit}
            position="right"
            spacing={40}
            component={motion.div}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout>
            <Button
              className={cx(classes.formBtn, classes.formCancelBtn)}
              onClick={cancelEditHandler}
              variant="outline">
              Cancel
            </Button>
            <Button className={classes.formBtn} type="submit">
              Save
            </Button>
          </Group>
        )}
      </motion.form>

      {isSuccessfulChange && (
        <Alert
          classNames={{
            title: classes.alertTitle,
            message: classes.alertMessage,
          }}
          icon={<Success />}
          title="Success"
          color="green">
          Password updated
        </Alert>
      )}
    </Card>
  );
};

export default SettingsPassword;
