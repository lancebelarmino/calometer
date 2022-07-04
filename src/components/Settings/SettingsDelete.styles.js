import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  btn: {
    borderColor: theme.colors.gray[0],
    color: theme.colors.red[5],

    '&:hover': {
      background: 'rgba(255, 116, 60, 0.08)',
      borderColor: theme.colors.red[5],
      color: theme.colors.red[5],
    },
  },

  btnLabel: {
    fontSize: theme.fontSizes.md,
  },
}));

export default useStyles;
