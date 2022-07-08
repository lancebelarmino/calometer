import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '@mantine/core';
import { GooSpinner } from 'react-spinners-kit';
import { setLocalItem } from '../../utils/localStorage';
import { motion } from 'framer-motion';
import OnboardingSection from '../../components/Onboarding/OnboardingSection';
import { contentVariant } from '../../utils/framer-variants';
import useStyles from './OnboardingFour.styles';

const OnboardingFour = ({ setScreen, isSubmitted }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  useEffect(() => {
    if (isSubmitted) {
      let screenTimer = setTimeout(() => {
        setScreen(5);
        setLocalItem('isOnboarded', true);
        navigate('/dashboard', { replace: true });
      }, 1500);
      return () => {
        clearTimeout(screenTimer);
      };
    }
  }, [isSubmitted, navigate, setScreen]);

  return (
    <OnboardingSection size={'100%'} motionKey="screen1">
      <div className={classes.wrapper}>
        <motion.div
          className={classes.spinner}
          key="spinner"
          variants={contentVariant}
          initial="hidden"
          animate="visible"
          exit="exit">
          <GooSpinner size={160} color="#6ED47C" />
        </motion.div>

        <Title className={classes.title} order={1} component={motion.h1} variants={contentVariant} custom={1}>
          Great! You're all set.
        </Title>

        <Title className={classes.description} order={3} component={motion.h3} variants={contentVariant} custom={2}>
          Redirecting you to the dashboard
        </Title>
      </div>
    </OnboardingSection>
  );
};

export default OnboardingFour;
