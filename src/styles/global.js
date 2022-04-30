const global = (theme) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    fontFamily: theme.fontFamily,
    overflow: 'hidden',
  },
});

export default global;
