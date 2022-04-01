import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    display: 'flex',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },
}));

export default useStyles;
