import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    display: 'grid',
    placeItems: 'center',
    marginTop: 0,
    height: '100vh',
  },

  wrapper: {
    width: 440,
    position: 'relative',
  },

  logo: {
    position: 'absolute',
    top: -120,

    '@media (max-width: 1366px)': {
      top: -80,
    },
  },

  title: {
    marginBottom: 40,
  },
}));

export default useStyles;
