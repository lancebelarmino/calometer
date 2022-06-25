import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    position: 'relative',
  },

  item: {
    position: 'relative',
    paddingLeft: 14,

    '&::before': {
      content: `''`,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
    },
  },

  title: {
    marginBottom: 8,
  },

  details: {
    flexGrow: 1,
  },

  breakfast: {
    '&::before': {
      borderLeft: `2px solid ${theme.colors.orange[2]}`,
    },
  },

  lunch: {
    '&::before': {
      borderLeft: `2px solid ${theme.colors.yellow[2]}`,
    },
  },

  dinner: {
    '&::before': {
      borderLeft: `2px solid ${theme.colors.green[1]}`,
    },
  },

  snack: {
    '&::before': {
      borderLeft: `2px solid ${theme.colors.lime[1]}`,
    },
  },

  delete: {
    display: 'grid',
    placeItems: 'center',
    position: 'absolute',
    top: '50%',
    right: -100,
    transform: 'translateY(-50%)',
    height: '100%',
    width: 60,
    background: 'rgba(255, 116, 60, 0.08)',
  },
}));

export default useStyles;
