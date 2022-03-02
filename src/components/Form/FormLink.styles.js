import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  message: {
    display: 'block',
    textAlign: 'center',
  },

  highlight: {
    color: theme.colors.green[1],
  },
}));

export default useStyles;
