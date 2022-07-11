import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  error: {
    display: 'grid',
    placeItems: 'center',
    alignContent: 'center',
    height: 'calc(100vh - 80px)',
    textAlign: 'center',

    [theme.fn.smallerThan('md')]: {
      height: 'calc(100vh - 168px)',
    },
  },

  errorIcon: {
    marginBottom: 80,
  },

  errorTitle: {
    marginBottom: 28,
  },

  errorBtn: {
    color: theme.colors.green[1],
    borderColor: theme.colors.green[1],
  },
}));

export default useStyles;
