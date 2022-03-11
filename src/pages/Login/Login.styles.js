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
  },

  forgot: {
    display: 'block',
    marginTop: 12,
    textAlign: 'right',
  },

  forgotLink: {
    fontSize: 14,
  },

  register: {
    display: 'block',
    textAlign: 'center',
  },

  signup: {
    color: theme.colors.green[1],
  },

  error: {
    position: 'absolute',
    bottom: -24,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.red,
  },
}));

export default useStyles;
