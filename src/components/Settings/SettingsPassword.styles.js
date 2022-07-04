import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: 40,
  },

  headerTitle: {
    marginBottom: 8,
  },

  divider: {
    marginBottom: 40,
    color: theme.colors.gray[0],
  },

  form: {
    marginBottom: 40,
  },

  formRow: {
    position: 'relative',

    '&:not(:last-of-type)': {
      marginBottom: 40,
    },
  },

  alertTitle: {
    color: theme.colors.green[1],
  },

  alertMessage: {
    color: theme.colors.black,
  },
}));

export default useStyles;
