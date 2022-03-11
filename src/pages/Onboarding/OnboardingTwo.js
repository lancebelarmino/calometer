import { Title, Text, UnstyledButton, Group, Image } from '@mantine/core';
import { motion } from 'framer-motion';
import OnboardingSection from '../../components/Onboarding/OnboardingSection';
import LightIcon from '../../assets/svg/lightly-active.svg';
import ModerateIcon from '../../assets/svg/moderately-active.svg';
import VeryIcon from '../../assets/svg/very-active.svg';
import { ReactComponent as NextIcon } from '../../assets/svg/active-next.svg';
import useStyles from './OnboardingTwo.styles';

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

const buttonVariant = {
  hidden: {
    x: 0,
  },
  hover: { x: 6 },
};

const OnboardingTwo = ({ setScreen, setData }) => {
  const { classes } = useStyles();

  const lightClickHandler = () => {
    setData((prevData) => {
      return { lifeStyle: 'Lightly Active', ...prevData };
    });

    setScreen(3);
  };

  const moderateClickHandler = () => {
    setData((prevData) => {
      return { lifeStyle: 'Moderately Active', ...prevData };
    });

    setScreen(3);
  };

  const veryClickHandler = () => {
    setData((prevData) => {
      return { lifeStyle: 'Moderately Active', ...prevData };
    });

    setScreen(3);
  };

  return (
    <OnboardingSection size={440} motionKey="screen2">
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Title className={classes.title} order={2} component={motion.h2} variants={contentVariant} custom={0}>
            Tell us your lifestyle
          </Title>
          <Text size="lg" component={motion.div} variants={contentVariant} custom={1}>
            How active are you from a day-to-day basis?
          </Text>
        </div>

        <UnstyledButton
          className={classes.button}
          onClick={lightClickHandler}
          component={motion.button}
          variants={contentVariant}
          custom={2}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover">
          <Group position="apart" align="center">
            <Group position="apart" align="center" spacing={28}>
              <Image src={LightIcon} />
              <Title className={classes.buttonTitle} order={6}>
                Lightly Active
              </Title>
            </Group>

            <motion.div variants={buttonVariant}>
              <NextIcon className={classes.nextIcon} initial="hidden" />
            </motion.div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          className={classes.button}
          onClick={moderateClickHandler}
          component={motion.button}
          variants={contentVariant}
          custom={3}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover">
          <Group position="apart" align="center">
            <Group position="apart" align="center" spacing={28}>
              <Image src={ModerateIcon} />
              <Title className={classes.buttonTitle} order={6}>
                Moderately Active
              </Title>
            </Group>

            <motion.div variants={buttonVariant}>
              <NextIcon className={classes.nextIcon} initial="hidden" />
            </motion.div>
          </Group>
        </UnstyledButton>

        <UnstyledButton
          className={classes.button}
          onClick={veryClickHandler}
          component={motion.button}
          variants={contentVariant}
          custom={4}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover">
          <Group position="apart" align="center">
            <Group position="apart" align="center" spacing={28}>
              <Image src={VeryIcon} />
              <Title className={classes.buttonTitle} order={6}>
                Very Active
              </Title>
            </Group>

            <motion.div variants={buttonVariant}>
              <NextIcon className={classes.nextIcon} initial="hidden" />
            </motion.div>
          </Group>
        </UnstyledButton>
      </div>
    </OnboardingSection>
  );
};

export default OnboardingTwo;
