import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  section: {
    position: 'relative',
  },

  header: {
    marginBottom: 40,
  },

  stats: {
    marginBottom: 40,
  },

  statisticsBtn: {
    '& path': {
      transition: theme.other.transitions.fill,
    },

    '&:hover path': {
      fill: theme.colors.green[1],
    },
  },

  statisticsBtnActive: {
    borderColor: theme.colors.green[1],
    color: theme.colors.green[1],

    '& path': {
      fill: theme.colors.green[1],
    },
  },

  statsWrapper: {
    justifyContent: 'space-between',
  },

  statsChart: {
    width: 360,

    [theme.fn.smallerThan('md')]: {
      width: '100%',

      '&:not(:last-of-type)': {
        marginBottom: 24,
      },
    },
  },

  settings: {
    marginBottom: 32,
  },

  settingsDropdownRoot: {
    display: 'grid',
    placeItems: 'center',
  },

  settingsDropdownItemBody: {
    borderColor: theme.colors.gray[0],
  },

  settingsDropdownItem: {
    textTransform: 'capitalize',
  },

  settingsDropdownItemHovered: {
    color: theme.colors.green[1],
    background: 'rgba(110, 212, 124, 0.08) !important',
  },

  settingsDropdownItemActive: {
    color: theme.colors.green[1],
    background: 'rgba(110, 212, 124, 0.08)',
  },

  settingsBtn: {
    color: theme.colors.gray[3],
    fontSize: theme.fontSizes.sm,
    transition: theme.other.transitions.color,
    textTransform: 'capitalize',

    '& path': {
      transition: theme.other.transitions.fill,
    },

    '&:hover': {
      color: theme.colors.green[1],
    },

    '&:hover path': {
      fill: theme.colors.green[1],
    },
  },

  sort: {
    width: 100,
  },

  sortRightSection: {
    display: 'none',
  },

  board: {
    position: 'absolute',
    width: 'calc(100% - 80px)',
    left: 40,
    paddingBottom: 24,
  },

  boardArea: {
    width: '100%',
    height: 'auto',
    // minHeight: 720,
    paddingBottom: 40,
  },

  boardBtn: {
    width: 360,

    '& path': {
      transition: theme.other.transitions.fill,
    },

    '&:hover path': {
      fill: theme.colors.green[1],
    },
  },
}));

export default useStyles;
