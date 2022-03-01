const global = (theme) => ({
  body: {
    fontFamily: theme.fontFamily,
  },

  input: {
    '&:autofill': {
      color: 'red !important',
    },
  },
});

export default global;
