import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  chart: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  value: {
    marginBottom: 4,
  },

  title: {
    marginBottom: 4,
  },
}));

export default useStyles;
