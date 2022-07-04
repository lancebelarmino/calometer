import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  backdrop: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, .4)',
    cursor: 'pointer',
    zIndex: 200,
  },

  modal: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -40%)',
    width: 620,
    height: 'auto',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 28px 23px -7px, rgb(0 0 0 / 4%) 0px 12px 12px -7px',
    background: '#FFF',
    zIndex: 200,

    [theme.fn.smallerThan('sm')]: {
      width: 'calc(100% - 48px)',
    },
  },

  alertMessage: {
    color: theme.colors.black,
  },

  warning: {
    marginBottom: 28,
  },

  deleteIcon: {
    '& path': {
      stroke: theme.colors.red[5],
    },
  },

  btn: {
    width: 120,
  },

  deleteBtn: {
    backgroundColor: theme.colors.red[5],

    '&:hover': {
      backgroundColor: theme.colors.red[6],
    },
  },
}));

export default useStyles;
