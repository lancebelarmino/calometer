const componentStyles = {
  // Typography
  Title: (theme) => ({
    root: { color: theme.colors.black },
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
      border: `1px solid ${theme.colors.gray[1]}`,
      transition: theme.other.transitions.border,
      '&:focus': { borderColor: theme.colors.green[1] },
    },
    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
    },
  }),

  PasswordInput: (theme) => ({
    defaultVariant: {
      border: `1px solid ${theme.colors.gray[1]}`,
      transition: theme.other.transitions.border,
      '&:focus-within': {
        outline: 'none',
        borderColor: theme.colors.green[1],
      },
    },
    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
      lineHeight: 1.5,
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