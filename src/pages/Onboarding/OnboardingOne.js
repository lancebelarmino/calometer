import { useEffect } from 'react';
import { Title, Image } from '@mantine/core';
import { motion } from 'framer-motion';
import OnboardingSection from '../../components/Onboarding/OnboardingSection';
import logo from '../../assets/svg/onboarding-logo.svg';
import { contentVariant } from '../../utils/framer-variants';
import useStyles from './OnboardingOne.styles';

const OnboardingOne = ({ setScreen }) => {
  const { classes } = useStyles();

  useEffect(() => {
    let screenTimer = setTimeout(() => setScreen(2), 1500);
    return () => clearTimeout(screenTimer);
  }, [setScreen]);

  return (
    <OnboardingSection size={'100%'} motionKey="screen1">
      <div className={classes.wrapper}>
        <Image
          className={classes.logo}
          fit="contain"
          src={logo}
          component={motion.div}
          custom={0}
          variants={contentVariant}
        />

        <Title className={classes.title} order={1} component={motion.h1} variants={contentVariant} custom={1}>
          Welcome to Calometer
        </Title>

        <Title className={classes.description} order={3} component={motion.h3} variants={contentVariant} custom={2}>
          Calorie Tracker To Elevate Your Lifestyle
        </Title>
      </div>
    </OnboardingSection>
  );
};

export default OnboardingOne;
