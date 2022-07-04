import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  sectionTitle: {
    marginBottom: 80,

    [theme.fn.smallerThan('sm')]: {
      marginBottom: 40,
    },
  },

  profile: {
    flexGrow: 1,
  },

  leftCol: {
    width: 400,

    [theme.fn.smallerThan('lg')]: {
      width: '100%',
    },
  },

  password: {
    marginBottom: 40,
  },
}));

export default useStyles;
