import { createStyles } from '@mantine/core';

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
    height: 'calc(100vh - 72px)',

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
    height: 32,

    [theme.fn.smallerThan('sm')]: {
      padding: 0,
      marginBottom: 80,
    },
  },
}));

export default useStyles;
