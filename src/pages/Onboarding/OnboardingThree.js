import { useState } from 'react';
import { Title, Text, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import SegmentedControl from '../../components/Input/SegmentedControl';
import OnboardingSection from '../../components/Onboarding/OnboardingSection';
import { contentVariant } from '../../utils/framer-variants';
import useStyles from './OnboardingThree.styles';

const OnboardingThree = ({ setScreen, setData }) => {
  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('m');
  const form = useForm({
    initialValues: {
      birthday: '',
      weight: '',
      height: '',
    },

    validate: {
      birthday: (value) => (value === '' ? 'Cannot be blank' : null),
      weight: (value) => (/^[0-9]*(\.[0-9]{0,2})?$/.test(value) ? null : 'Invalid weight'),
      height: (value) =>
        value === ''
          ? null
          : heightUnit === 'm'
          ? /^[0-9]*(\.[0-9]{0,2})?$/.test(value)
            ? null
            : `Invalid height, E.g. 1.5`
          : /^[3-7]'(?:\s*(?:1[01]|[0-9])(''|"))?$/.test(value)
          ? null
          : `Invalid height, E.g. 5'11"`,
    },
  });

  const { classes } = useStyles();

  const dateChangeHandler = (date) => {
    form.setFieldValue('birthday', date);
  };

  const changeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);
  };

  const submitHandler = (value) => {
    setData((prevData) => {
      return {
        ...prevData,
        birthday: dayjs(value.birthday).format('YYYY-MM-DD'),
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
            <DatePicker
              id="birthday"
              placeholder="Pick date"
              label="Birthday"
              clearable={false}
              onChange={dateChangeHandler}
              required
              {...form.getInputProps('birthday')}
            />
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
