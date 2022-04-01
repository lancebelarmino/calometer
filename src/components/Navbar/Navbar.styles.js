import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const logo = getRef('logo');
  const icon = getRef('icon');
  const link = getRef('link');
  const header = getRef('header');
  const desktopBurger = getRef('desktopBurger');

  return {
    nav: {
      position: 'sticky',
      top: 0,
      width: '280px !important',
      maxWidth: '280px !important',
      minWidth: '0 !important',
      padding: '2.5rem !important',
      background: theme.colors.white,
      borderRight: '1.6px solid #F0F0F0',
      borderRadius: '0px 28px 28px 0px',
      height: '100vh',
      transition: 'max-width 500ms ease',
    },

    mobileNav: {
      height: 97.19,
      maxHeight: 97.19,
      minHeight: '0 !important',
      padding: '1.5rem 0 2.5rem 0',
      border: '1.6px solid transparent',
      transition: 'height 800ms ease, max-height 800ms ease',
      background: theme.colors.white,
    },

    navClosed: {
      maxWidth: '100px !important',
      transition: 'max-width 500ms ease',

      [`& .${header}`]: {
        flex: 'none',
        width: 30,
        height: 28,
      },

      [`& .${logo}`]: {
        display: 'none',
      },

      [`& .${desktopBurger}`]: {
        right: 0,
        transition: 'right 500ms ease',
      },

      [`& .${icon}`]: {
        transition: 'margin 500ms ease',
      },
    },

    mobileNavOpened: {
      height: 514,
      maxHeight: 514,
      border: '1.6px solid #F0F0F0',
      borderRadius: '0px 0px 28px 28px',
      transition: 'max-height 800ms ease',
    },

    header: {
      ref: header,
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 80,
    },

    mobileHeader: {
      position: 'relative',
      zIndex: 999,
      display: 'flex',
      justifyContent: 'space-between',

      [theme.fn.smallerThan('md')]: {
        padding: '0 2.5rem',
      },

      [theme.fn.smallerThan('sm')]: {
        padding: '0 1.5rem',
      },
    },

    logo: {
      ref: logo,
    },

    desktopBurger: {
      ref: desktopBurger,
      position: 'absolute',
      top: 0,
      right: -24,
      padding: '0 !important',
      transition: 'right 500ms ease',
    },

    link: {
      ref: link,
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      height: 44,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[3],
      fontWeight: 400,
      transition: theme.other.transitions.color,

      '&:not(:last-child)': {
        marginBottom: 40,
      },

      '&:hover': {
        color: theme.colors.green[1],
        textDecoration: 'none',

        [`& .${icon} path`]: {
          stroke: theme.colors.green[1],
        },
      },

      [theme.fn.smallerThan('md')]: {
        paddingLeft: 20,
      },
    },

    linkIcon: {
      ref: icon,
      marginRight: 20,

      [`& path `]: {
        stopColor: theme.colors.gray[2],
        transition: theme.other.transitions.stroke,
      },
    },

    linkActive: {
      '&, &:hover': {
        color: theme.colors.green[1],

        [`& .${icon} path`]: {
          stroke: theme.colors.green[1],
        },
      },

      '&::before': {
        content: `''`,
        position: 'absolute',
        top: 0,
        left: -40,
        width: 4,
        height: '100%',
        borderRadius: '0px 4px 4px 0px',
        background: theme.colors.green[1],

        [theme.fn.smallerThan('md')]: {
          left: 0,
        },
      },
    },

    mobileMenu: {
      position: 'relative',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      background: theme.colors.white,

      [theme.fn.smallerThan('md')]: {
        padding: '2.5rem 2.5rem 0 2.5rem',
      },

      [theme.fn.smallerThan('sm')]: {
        padding: '2.5rem 1.5rem 0 1.5rem',
      },
    },

    footer: {
      position: 'absolute',
      bottom: 40,
    },
  };
});

export default useStyles;
