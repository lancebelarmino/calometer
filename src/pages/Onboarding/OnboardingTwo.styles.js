import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingBottom: 200,

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: 100,
    },

    '@media (max-height: 620px)': {
      paddingBottom: 0,
    },
  },

  header: {
    marginBottom: 40,
  },

  title: {
    marginBottom: 12,
  },

  button: {
    display: 'block',
    width: '100%',
    padding: '1.25rem 1.5rem',
    marginBottom: 28,
    border: '1px solid #E2E2E2',
    borderRadius: 8,
    transition: theme.other.transitions.border,

    '&:hover': {
      borderColor: theme.colors.green[1],
      color: theme.colors.green[1],
    },

    '&:hover svg': {
      stroke: theme.colors.green[1],
    },

    '&:hover h6': {
      color: theme.colors.green[1],
    },
  },

  buttonTitle: {
    fontWeight: 400,
  },

  nextIcon: {
    stroke: theme.colors.gray[3],
    transition: theme.other.transitions.stroke,
  },
}));

export default useStyles;
