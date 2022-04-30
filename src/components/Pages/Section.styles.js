import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  container: {
    padding: 40,

    [theme.fn.smallerThan('sm')]: {
      padding: '2.5rem 1.5rem',
    },
  },
}));

export default useStyles;
