const componentStyles = {
  // Typography
  Title: (theme) => ({
    root: { color: theme.colors.black },
  }),

  Text: (theme) => ({
    root: { color: theme.colors.gray[3] },
  }),

  Anchor: (theme) => ({
    root: {
      color: theme.colors.gray[3],
      transition: theme.other.transitions.color,

      '&:hover': { color: theme.colors.green[1], textDecoration: 'none' },
    },
  }),

  // Inputs
  TextInput: (theme) => ({
    defaultVariant: {
      height: 40,
      border: `1px solid ${theme.colors.gray[1]}`,
      transition: theme.other.transitions.border,

      '&:focus': { borderColor: theme.colors.green[1] },
    },

    input: {
      height: 40,
      color: theme.colors.black,
      fontSize: 14,
      lineHeight: 1.2,
    },

    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
    },

    error: {
      position: 'absolute',
      bottom: -24,
    },

    required: {
      display: 'none',
    },
  }),

  PasswordInput: (theme) => ({
    root: {
      position: 'relative',
    },

    defaultVariant: {
      height: '40px !important',
      border: `1px solid ${theme.colors.gray[1]}`,
      transition: theme.other.transitions.border,

      '&:focus-within': {
        outline: 'none',
        borderColor: theme.colors.green[1],
      },
    },

    innerInput: {
      height: '100%',
      color: theme.colors.black,
      fontSize: 14,
      lineHeight: 1.2,
    },

    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
      lineHeight: 1.5,
    },

    error: {
      position: 'absolute',
      bottom: -24,
    },

    required: {
      display: 'none',
    },
  }),

  // Buttons
  Button: (theme) => ({
    root: {
      backgroundColor: theme.colors.green[1],
      transition: theme.other.transitions.background,

      '&:hover': {
        backgroundColor: theme.colors.green[2],
      },
    },
  }),

  // Layouts
  Container: (theme) => ({
    root: {
      padding: 0,
    },
  }),

  Grid: (theme) => ({
    root: {
      margin: 0,
    },
  }),

  Col: (theme) => ({
    root: {
      padding: 0,
    },
  }),
};

export default componentStyles;
