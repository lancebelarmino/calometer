import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  meal: {
    width: 84,
    padding: '0.25rem 0.5rem',
    borderRadius: 4,
    fontSize: theme.fontSizes.sm,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  breakfast: {
    color: theme.colors.orange[2],
    background: theme.colors.orange[0],
  },

  lunch: {
    color: theme.colors.yellow[2],
    background: theme.colors.yellow[0],
  },

  dinner: {
    color: theme.colors.green[1],
    background: theme.colors.green[0],
  },

  snack: {
    color: theme.colors.lime[1],
    background: theme.colors.lime[0],
  },
}));

export default useStyles;
