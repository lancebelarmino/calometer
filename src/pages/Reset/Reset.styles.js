import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    marginBottom: 40,
  },

  title: {
    marginBottom: 12,
  },

  form: {
    marginBottom: 32,
  },

  formRow: {
    position: 'relative',
    marginBottom: 40,
  },

  emailIcon: {
    display: 'block',
    width: '100%',
    marginBottom: 40,
  },

  successBtn: {
    marginBottom: 32,
  },

  resendBtn: {
    display: 'block',
    width: '100%',
    color: theme.colors.gray[3],
    textAlign: 'center',
    transition: theme.other.transitions.color,

    '&:hover': {
      color: theme.colors.green[1],
    },
  },

  highlight: {
    color: theme.colors.green[1],
  },

  background: {
    background: 'left center / cover no-repeat url("https://f004.backblazeb2.com/file/calometer/signin-lg.svg")',

    '@media (max-width: 1366px)': {
      background: 'center right / contain no-repeat url("https://f004.backblazeb2.com/file/calometer/signin-md.svg")',
    },
  },
}));

export default useStyles;
