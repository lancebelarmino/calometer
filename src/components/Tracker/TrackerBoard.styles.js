import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    padding: 0,
    width: 360,
  },

  header: {
    position: 'relative',
    padding: '1.75rem 1.75rem 0 1.75rem',
    marginBottom: 40,
  },

  headerDate: {
    marginBottom: 8,
  },

  sort: {
    width: 100,
  },

  sortRightSection: {
    display: 'none',
  },

  list: {
    height: 420,
    width: '100%',
    padding: '0 1.75rem',
    marginBottom: 40,
  },

  scrollbar: {
    zIndex: 199,
    position: 'absolute',
    right: '8px !important',
    background: 'none',

    '&:hover': {
      background: 'none',
    },
  },

  scrollCorner: {
    display: 'none',
  },

  scrollThumb: {
    background: theme.colors.gray[0],
  },

  horizontalBar: {
    display: 'none',
  },

  reveal: {
    position: 'absolute',
    zIndex: 99,
    width: '100%',
    height: 40,
  },

  revealTop: {
    top: 0,
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 88.02%)',
  },

  revealBottom: {
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 88.02%)',
  },

  notif: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'grid',
    placeItems: 'center',
  },

  notifIcon: {
    marginBottom: 24,
  },

  boardItem: {
    '&:not(:last-of-type)': {
      marginBottom: 40,
    },
  },

  editor: {
    padding: '0 1.75rem',
    marginBottom: 40,
  },

  footer: {
    height: 88,
    padding: '0 1.75rem 1.75rem 1.75rem',
    textAlign: 'right',
  },

  footerAdd: {
    '& > circle, & > path': {
      transition: `${theme.other.transitions.stroke}, ${theme.other.transitions.fill}`,
    },

    '&:hover > circle': {
      stroke: theme.colors.green[1],
      fill: 'rgba(110, 212, 124, 0.08)',
    },

    '&:hover > path': {
      fill: theme.colors.green[1],
    },
  },

  footerTitle: {
    marginBottom: 8,
  },
}));

export default useStyles;
