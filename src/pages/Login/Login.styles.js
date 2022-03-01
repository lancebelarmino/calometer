import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  logo: {
    marginBottom: 120,
  },

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

  errorInput: {
    borderColor: theme.colors.red,
  },

  forgot: {
    display: 'block',
    marginTop: 12,
    textAlign: 'right',
  },

  forgotLink: {
    fontSize: 14,
  },

  button: { marginBottom: 32 },

  register: {
    display: 'block',
    textAlign: 'center',
  },

  signup: {
    color: theme.colors.green[1],
  },

  background: {
    background: 'left center / cover no-repeat url("https://f004.backblazeb2.com/file/calometer/signin-lg.svg")',

    '@media (max-width: 1366px)': {
      background: 'center right / contain no-repeat url("https://f004.backblazeb2.com/file/calometer/signin.svg")',
    },
  },
}));

export default useStyles;
