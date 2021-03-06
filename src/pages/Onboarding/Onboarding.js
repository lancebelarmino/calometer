import { useState, useContext, useEffect } from 'react';
import { Box } from '@mantine/core';
import AuthContext from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import OnboardingOne from './OnboardingOne';
import OnboardingTwo from './OnboardingTwo';
import OnboardingThree from './OnboardingThree';
import OnboardingFour from './OnboardingFour';
import { sectionVariant } from '../../utils/framer-variants';
import useStyles from './Onboarding.styles';

const defaultData = {
  lifestyle: null,
  birthday: null,
  weight: null,
  weightUnit: 'lbs',
  height: null,
  heightUnit: 'm',
};

export const Onboarding = () => {
  const [screen, setScreen] = useState(1);
  const [data, setData] = useState(defaultData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { onOnboarded } = useContext(AuthContext);
  const { classes } = useStyles();

  useEffect(() => {
    if (screen === 4) {
      onOnboarded(data, () => {
        setIsSubmitted(true);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  return (
    <motion.div className={classes.onboarding} variants={sectionVariant} initial="hidden" animate="visible" exit="exit">
      <AnimatePresence exitBeforeEnter>
        {screen === 1 && <OnboardingOne key="screen1" setScreen={setScreen} setData={setData} />}
        {screen === 2 && <OnboardingTwo key="screen2" setScreen={setScreen} setData={setData} />}
        {screen === 3 && <OnboardingThree key="screen3" setScreen={setScreen} setData={setData} />}
        {screen === 4 && <OnboardingFour key="screen4" setScreen={setScreen} isSubmitted={isSubmitted} />}
      </AnimatePresence>

      <Box className={classes.background} component={motion.div} variants={sectionVariant} />
    </motion.div>
  );
};
