import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  dashboard: {
    display: 'flex',

    '@media (max-height: 620px)': {
      flexDirection: 'column',
    },

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  dashboardColLeft: {
    flexGrow: 1,
  },

  header: {
    display: 'block',
    marginBottom: 80,
  },

  headerOverline: {
    marginBottom: 14,
  },

  headerTitle: {
    marginBottom: 20,
  },

  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: 40,
    marginBottom: 80,

    [theme.fn.smallerThan('sm')]: {
      alignContent: 'center',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gridTemplateRows: 'repeat(3, auto)',
    },
  },

  statsBar: {
    gridRow: '1/3',

    [theme.fn.smallerThan('sm')]: {
      gridRow: '1/1',
    },
  },

  statsLine: {
    width: 360,

    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },

    [theme.fn.largerThan('xl')]: {
      width: 420,
    },
  },

  mealsTitle: {
    marginBottom: 28,
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  thead: {
    marginBottom: 28,
    textAlign: 'left',
    borderBottom: '1px solid #F0F0F0',

    '& th': {
      paddingBottom: 16,
      color: theme.colors.gray[3],
      textTransform: 'uppercase',
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
    },
  },

  thFood: {
    width: '45%',

    [theme.fn.smallerThan('sm')]: {
      width: '30%',
    },
  },

  thTime: {
    width: '10%',
  },

  tbody: {
    '& td': {
      paddingTop: 28,
      color: theme.colors.black,
    },
  },

  divider: {
    borderLeft: '2px solid #F1F1F1',

    '@media (max-height: 620px)': {
      width: '100%',
      borderBottom: '2px solid #F1F1F1',
      background: 'red',
    },

    [theme.fn.smallerThan('md')]: {
      width: '100%',
      borderBottom: '2px solid #F1F1F1',
      background: 'red',
    },
  },

  dashboardColRight: {
    width: 380,

    '@media (max-height: 620px)': {
      width: '100%',
    },

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },

  profileEdit: {
    textAlign: 'right',
    marginBottom: 20,
  },

  profileHeader: {
    display: 'grid',
    placeItems: 'center',
    marginBottom: 60,
  },

  profileAvatar: {
    marginBottom: 24,
  },

  profileDetails: {
    marginBottom: 60,
  },

  profileCard: {
    padding: '1rem 1.25rem',
    borderRadius: 12,

    '&:not(:last-of-type)': {
      marginBottom: 24,
    },
  },

  profileLabel: {
    marginBottom: 12,
  },

  profileIcon: {
    display: 'grid',
    placeItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 4,
  },

  profileLime: {
    background: theme.colors.lime[0],
  },

  profileOrange: {
    background: theme.colors.orange[0],
  },

  profileYellow: {
    background: theme.colors.yellow[0],
  },

  quoteHeader: {
    marginBottom: 24,
  },

  icon: {
    '& > circle, & > path': {
      transition: theme.other.transitions.stroke,
    },

    '&:hover > circle': {
      stroke: theme.colors.green[1],
    },

    '&:hover > path': {
      fill: theme.colors.green[1],
    },
  },

  quoteItem: {
    position: 'relative',
    paddingLeft: 12,

    '&::before': {
      content: `''`,
      position: 'absolute',
      top: 0,
      left: 0,
      height: 24,
      borderLeft: '2px solid #FFC700',
    },

    '&:not(:last-of-type)': {
      marginBottom: 28,
    },
  },

  quoteContent: {
    marginBottom: 8,
  },

  formRow: {
    position: 'relative',
  },
}));

export default useStyles;
