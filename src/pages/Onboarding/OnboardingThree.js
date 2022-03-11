import { useState } from 'react';
import { Title, Text, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { DatePicker } from '@mantine/dates';
import { motion } from 'framer-motion';
import SegmentedControl from '../../components/Input/SegmentedControl';
import OnboardingSection from '../../components/Onboarding/OnboardingSection';
import useStyles from './OnboardingThree.styles';

const contentVariant = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: (i) => {
    return {
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.4,
        delay: i * 0.05,
      },
    };
  },

  exit: (i) => {
    return {
      y: 10,
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
        delay: i * 0.05,
      },
    };
  },
};

const getFormattedDate = (date) => {
  const offset = date.getTimezoneOffset();
  const offsetDate = new Date(date.getTime() - offset * 60 * 1000);

  return offsetDate.toISOString().split('T')[0];
};

const OnboardingThree = ({ setScreen, setData }) => {
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('m');
  const form = useForm({
    initialValues: {
      birthday: '',
      weight: '',
      height: '',
    },

    validationRules: {
      weight: (value) => /^[0-9]*(\.[0-9]{0,2})?$/.test(value),
      height: (value) =>
        heightUnit === 'm'
          ? /^[0-9]*(\.[0-9]{0,2})?$/.test(value)
          : /^[3-7]'(?:\s*(?:1[01]|[0-9])(''|"))?$/.test(value),
    },

    errorMessages: {
      weight: 'Invalid weight',
      height: 'Invalid height',
    },
  });

  const { classes } = useStyles();

  const dateChangeHandler = (date) => {
    const birthday = getFormattedDate(date);
    form.setFieldValue('birthday', birthday);
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  const submitHandler = (value) => {
    setData((prevData) => {
      return {
        ...prevData,
        birthday: value.birthday,
        weight: value.weight,
        weightUnit: weightUnit,
        height: value.height,
        heightUnit: heightUnit,
      };
    });

    setScreen(4);
  };

  return (
    <OnboardingSection size={440} motionKey="screen3">
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Title className={classes.title} order={2} component={motion.h2} variants={contentVariant} custom={0}>
            Tell us more
          </Title>

          <Text size="lg" component={motion.div} variants={contentVariant} custom={1}>
            We just need to know a few more things
          </Text>
        </div>

        <motion.form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
          <motion.div className={classes.formRow} variants={contentVariant} custom={2}>
            <DatePicker id="birthday" placeholder="Pick date" label="Birthday" onChange={dateChangeHandler} required />
          </motion.div>

          <motion.div className={classes.formRow} variants={contentVariant} custom={3}>
            <TextInput
              label="Weight"
              placeholder={weightUnit === 'lbs' ? `E.g. 136` : 'E.g. 62'}
              onChange={changeHandler}
              onBlur={() => form.validateField('weight')}
              required
              {...form.getInputProps('weight')}
            />
            <SegmentedControl
              data={[
                { id: 'lbs', label: 'lbs', value: 'lbs' },
                { id: 'kg', label: 'kg', value: 'kg' },
              ]}
              onClick={setWeightUnit}
              sx={() => ({
                position: 'absolute',
                top: 2,
                right: 0,
              })}
            />
          </motion.div>

          <motion.div className={classes.formRow} variants={contentVariant} custom={4}>
            <TextInput
              label="Height"
              placeholder={heightUnit === 'm' ? 'E.g. 1.5' : `E.g. 5'11"`}
              onChange={changeHandler}
              onBlur={() => form.validateField('height')}
              required
              {...form.getInputProps('height')}
            />
            <SegmentedControl
              data={[
                { id: 'm', label: 'm', value: 'm' },
                { id: 'ft', label: 'ft', value: 'ft' },
              ]}
              onClick={setHeightUnit}
              sx={() => ({
                position: 'absolute',
                top: 2,
                right: 0,
              })}
            />
          </motion.div>

          <Button type="submit" fullWidth component={motion.button} variants={contentVariant} custom={5}>
            Next
          </Button>
        </motion.form>
      </div>
    </OnboardingSection>
  );
};

export default OnboardingThree;
