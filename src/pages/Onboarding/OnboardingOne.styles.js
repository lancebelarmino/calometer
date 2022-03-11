import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: 200,
    textAlign: 'center',

    '@media (max-height: 620px)': {
      paddingBottom: 0,
    },
  },

  logo: {
    margin: '0 auto',
    width: 64,

    [theme.fn.smallerThan('md')]: {
      width: 40,
    },
  },

  title: {
    margin: '2.5rem 0 1.5rem 0',

    [theme.fn.smallerThan('md')]: {
      fontSize: 44,
      lineHeight: 1.36,
      margin: '2rem 0 1.25rem 0',
    },

    [theme.fn.smallerThan('sm')]: {
      fontSize: 36,
      lineHeight: 1.555,
    },
  },

  description: {
    color: theme.colors.gray[3],
    fontWeight: 400,

    [theme.fn.smallerThan('md')]: {
      fontSize: 24,
      lineHeight: 1.166,
    },
  },
}));

export default useStyles;
