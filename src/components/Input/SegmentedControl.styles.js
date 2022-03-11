import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: 'auto',
    height: 20,
    border: `1px solid ${theme.colors.green[1]}`,
    borderRadius: 4,
    cursor: 'pointer',
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  input: {
    position: 'absolute',
    height: 0,
    width: 0,
    opacity: 0,
  },

  label: {
    display: 'inline-block',
    fontSize: 10,
    color: theme.colors.green[1],
    pointerEvents: 'none',
    userSelect: 'none',

    '&:hover': {
      cursor: 'pointer',
    },
  },

  activeLabel: {
    color: 'white',
  },
}));

export default useStyles;
