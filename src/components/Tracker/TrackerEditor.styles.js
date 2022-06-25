import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  input: {
    marginBottom: 12,
  },

  inputEditVariant: {
    marginBottom: 28,
  },

  selectInput: {
    fontWeight: 400,
    color: theme.colors.black,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  deleteBtn: {
    height: 20,
    padding: 0,
    color: theme.colors.red[5],

    '&:hover': {
      background: 'none',
      color: theme.colors.red[8],
    },
  },

  editBtn: {
    width: 100,
  },

  cancelBtn: {
    marginRight: 20,

    '&:hover': {
      background: 'rgba(255, 116, 60, 0.08)',
      borderColor: theme.colors.red[5],
      color: theme.colors.red[5],
    },
  },
}));

export default useStyles;
