import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    display: 'grid',
    position: 'relative',
    placeItems: 'center',
    height: 'calc(100vh - 72px)',
  },

  wrapper: {
    width: 440,
  },

  logo: {
    display: 'block',
    padding: '40px 0 0 40px',
    height: 32,
  },
}));

export default useStyles;
