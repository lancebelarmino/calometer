import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  comingSoon: {
    display: 'grid',
    placeItems: 'center',
    alignContent: 'center',
    height: 'calc(100vh - 80px)',
    textAlign: 'center',

    [theme.fn.smallerThan('md')]: {
      height: 'calc(100vh - 168px)',
    },
  },

  comingSoonIcon: {
    marginBottom: 40,
  },

  comingSoonTitle: {
    marginBottom: 16,
  },

  link: {
    color: theme.colors.green[1],
    textDecoration: 'none',
    transition: theme.other.transitions.color,

    '&:hover': {
      color: theme.colors.green[2],
    },
  },
}));

export default useStyles;
