import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  spinner: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    background: theme.colors.white,
  },
}));

export default useStyles;
