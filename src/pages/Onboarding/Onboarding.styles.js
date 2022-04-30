import { createStyles } from '@mantine/core';
import desktopBackground from '../../assets/svg/onboarding-xl.svg';
import laptopBackground from '../../assets/svg/onboarding-lg.svg';
import mobileBackground from '../../assets/svg/onboarding-sm.svg';

const useStyles = createStyles((theme) => ({
  onboarding: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
  },

  background: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    background: `center bottom / contain no-repeat url("${desktopBackground}")`,

    [theme.fn.smallerThan('lg')]: {
      background: `center bottom / contain no-repeat url("${laptopBackground}")`,
    },

    [theme.fn.smallerThan('sm')]: {
      background: `center bottom / contain no-repeat url("${mobileBackground}")`,
    },

    '@media (max-height: 620px)': {
      background: 'none',
    },
  },
}));

export default useStyles;
