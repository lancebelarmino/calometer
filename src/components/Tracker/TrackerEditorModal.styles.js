import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  backdrop: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, .4)',
    cursor: 'pointer',
    zIndex: 198,
  },

  modal: {
    position: 'absolute',
    top: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 620,
    height: 'auto',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 1px 3px rgb(0 0 0 / 5%), rgb(0 0 0 / 5%) 0px 28px 23px -7px, rgb(0 0 0 / 4%) 0px 12px 12px -7px',
    background: '#FFF',
    zIndex: 200,

    [theme.fn.smallerThan('sm')]: {
      top: '5%',
      width: 'calc(100% - 48px)',
    },
  },

  modalHeader: {
    marginBottom: 16,
  },

  modalTitle: {
    fontWeight: 500,
  },

  modalDate: {
    fontWeight: 400,
    color: theme.colors.gray[3],
  },

  modalDivider: {
    marginBottom: 24,
    color: theme.colors.gray[1],
  },
}));

export default useStyles;
