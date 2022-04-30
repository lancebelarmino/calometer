import { Container } from '@mantine/core';
import { motion } from 'framer-motion';
import useStyles from './OnboardingSection.styles';

const OnboardingSection = ({ children, size }) => {
  const { classes } = useStyles();

  return (
    <Container
      className={classes.screen}
      size={size}
      component={motion.div}
      initial="hidden"
      animate="visible"
      exit="exit">
      <div className={classes.wrapper}>{children}</div>
    </Container>
  );
};

export default OnboardingSection;
