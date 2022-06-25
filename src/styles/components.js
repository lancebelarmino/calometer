const componentStyles = {
  // Typography
  Title: (theme) => ({
    root: { color: theme.colors.black, transition: theme.other.transitions.color },
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

      '&:first-letter': {
        textTransform: 'capitalize',
      },
    },

    required: {
      display: 'none',
    },
  }),

  NumberInput: (theme) => ({
    input: {
      height: 40,
      color: theme.colors.black,
      border: `1px solid ${theme.colors.gray[1]}`,

      '&:focus': { borderColor: theme.colors.green[1] },
    },

    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
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

      '&:first-letter': {
        textTransform: 'capitalize',
      },
    },

    required: {
      display: 'none',
    },
  }),

  DatePicker: (theme) => ({
    dropdown: {
      border: `1px solid ${theme.colors.gray[1]}`,
    },

    arrow: { borderColor: theme.colors.gray[1] },

    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
      lineHeight: 1.5,
    },

    input: {
      border: `1px solid ${theme.colors.gray[1]}`,

      '&:focus-within': {
        outline: 'none',
        borderColor: theme.colors.green[1],
      },
    },

    error: {
      position: 'absolute',
      bottom: -24,
    },

    required: {
      display: 'none',
    },
  }),

  Select: (theme) => ({
    label: {
      marginBottom: 12,
      color: theme.colors.black,
      fontSize: theme.fontSizes.md,
    },

    input: {
      height: 40,
      paddingRight: 0,
      fontWeight: 500,
      color: theme.colors.gray[3],
      border: `1px solid ${theme.colors.gray[1]}`,

      '&:focus, &:focus-within': {
        borderColor: theme.colors.green[1],
      },

      '&::placeholder': {
        color: theme.colors.gray[3],
      },
    },

    item: {
      color: theme.colors.black,
    },

    selected: {
      color: theme.colors.green[1],
      background: 'rgba(110, 212, 124, 0.08)',
    },

    hovered: {
      background: 'rgba(110, 212, 124, 0.08)',
    },

    dropdown: {
      borderColor: theme.colors.gray[0],
    },

    required: {
      display: 'none',
    },
  }),

  // Buttons
  Button: (theme) => ({
    root: {
      height: 40,
    },

    filled: {
      backgroundColor: theme.colors.green[1],
      transition: theme.other.transitions.background,

      '&:hover': {
        backgroundColor: theme.colors.green[2],
      },
    },

    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
    },

    outline: {
      background: 'transparent',
      borderColor: theme.colors.gray[0],
      color: theme.colors.gray[3],
      transition: theme.other.transitions.all,

      '&:hover': {
        background: 'rgba(110, 212, 124, 0.08)',
        borderColor: theme.colors.green[1],
        color: theme.colors.green[1],
      },
    },

    subtle: {
      transition: theme.other.transitions.color,
    },
  }),

  UnstyledButton: (theme) => ({
    root: {
      color: theme.colors.black,
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
