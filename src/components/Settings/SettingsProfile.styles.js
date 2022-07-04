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

  avatar: {
    marginBottom: 40,
  },

  avatarButtons: {
    position: 'relative',
  },

  avatarError: {
    position: 'absolute',
    top: 52,
    left: 0,
    color: theme.colors.red[5],
  },

  inputFile: {
    display: 'inline',
  },

  inputFileInput: {
    display: 'none',
  },

  uploadPhotoBtn: {
    color: theme.colors.green[1],
    borderColor: theme.colors.green[1],
  },

  deletePhotoBtn: {
    '& path': {
      transition: theme.other.transitions.stroke,
    },

    '&:hover': {
      background: 'rgba(255, 116, 60, 0.08)',
      borderColor: theme.colors.red[5],
      color: theme.colors.red[5],
    },

    '&:hover path': {
      stroke: theme.colors.red[5],
    },
  },

  formInputs: {
    marginBottom: 40,
  },

  formRow: {
    position: 'relative',
  },

  formBtn: {
    width: 120,
  },

  formCancelBtn: {
    '& path': {
      transition: theme.other.transitions.stroke,
    },

    '&:hover': {
      background: 'rgba(255, 116, 60, 0.08)',
      borderColor: theme.colors.red[5],
      color: theme.colors.red[5],
    },

    '&:hover path': {
      stroke: theme.colors.red[5],
    },
  },

  selectInput: {
    color: theme.colors.black,
  },
}));

export default useStyles;
