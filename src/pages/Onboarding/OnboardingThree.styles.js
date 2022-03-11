import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: 200,

    [theme.fn.smallerThan('lg')]: {
      paddingBottom: 80,
    },

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: 100,
    },

    '@media (max-height: 620px)': {
      paddingBottom: 0,
    },
  },

  header: {
    marginBottom: 40,
  },

  title: {
    marginBottom: 12,
  },

  form: {
    marginBottom: 32,
  },

  formRow: {
    position: 'relative',
    marginBottom: 32,

    '&:last-of-type': {
      marginBottom: 40,
    },
  },
}));

export default useStyles;
