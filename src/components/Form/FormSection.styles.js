import { createStyles } from '@mantine/core';
import desktopBackground from '../../assets/svg/form-xl.svg';
import laptopBackground from '../../assets/svg/form-lg.svg';

const useStyles = createStyles((theme) => ({
  container: {
    [theme.fn.smallerThan('sm')]: {
      padding: '1.5rem 1.5rem 0 1.5rem',
    },
  },

  section: {
    display: 'grid',
    position: 'relative',
    placeItems: 'center',
    height: 'calc(100vh - 40px)',

    [theme.fn.smallerThan('lg')]: {
      height: 'calc(100vh - 32px)',
    },

    [theme.fn.smallerThan('sm')]: {
      display: 'relative',
      height: '100%',
    },
  },

  wrapper: {
    width: 440,

    [theme.fn.smallerThan('sm')]: {
      display: 'relative',
      width: '100%',
    },
  },

  logo: {
    display: 'block',
    padding: '2.5rem 0 0 2.5rem',
    width: 148,
    height: 32,

    [theme.fn.smallerThan('lg')]: {
      padding: '1.75rem 0 0 2rem',
    },

    [theme.fn.smallerThan('sm')]: {
      padding: 0,
      marginBottom: 80,
    },
  },

  background: {
    background: `left center / cover no-repeat url("${desktopBackground}")`,

    [theme.fn.smallerThan('lg')]: {
      background: `center left / contain no-repeat url("${laptopBackground}")`,
    },
  },
}));

export default useStyles;
