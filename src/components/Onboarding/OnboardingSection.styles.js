import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  screen: {
    position: 'relative',
    zIndex: 100,
    height: '100vh',
    width: '100%',
  },

  wrapper: {
    display: 'grid',
    height: '100%',
    placeItems: 'center',
  },
}));

export default useStyles;
