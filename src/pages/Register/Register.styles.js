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

  formRowPassword: {
    marginBottom: 60,
  },

  errorInput: {
    borderColor: theme.colors.red,
  },

  labelPass: { marginBottom: 8 },

  descPass: { marginBottom: 12, color: theme.colors.gray[3] },

  background: {
    background: 'left center / cover no-repeat url("https://f004.backblazeb2.com/file/calometer/signin-lg.svg")',

    '@media (max-width: 1366px)': {
      background: 'center right / contain no-repeat url("https://f004.backblazeb2.com/file/calometer/signin-md.svg")',
    },
  },
}));

export default useStyles;
