import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  title: {
    marginBottom: 40,
  },

  form: {
    marginBottom: 32,
  },

  formRow: {
    position: 'relative',
    marginBottom: 32,

    '&:last-of-type': {
      marginBottom: 40,
    },
  },

  labelPass: { marginBottom: 8 },

  descPass: { marginBottom: 12, color: theme.colors.gray[3] },
}));

export default useStyles;
