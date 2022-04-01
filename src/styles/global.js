const global = (theme) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    fontFamily: theme.fontFamily,
  },
});

export default global;
