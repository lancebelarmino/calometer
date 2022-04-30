import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    display: 'flex',

    '@media (max-height: 620px)': {
      flexDirection: 'column',
    },

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  content: {
    height: '100vh',
    flexGrow: 1,
  },
}));

export default useStyles;
