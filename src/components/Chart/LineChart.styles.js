import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
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

  chart: {
    width: 140,
    maxHeight: 80,
  },
}));

export default useStyles;
