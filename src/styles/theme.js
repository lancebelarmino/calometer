const theme = {
  colors: {
    black: '#53515B',
    gray: ['#F0F0F0', '#E2E2E2', '#B6B8BC', '#939295'],
    green: ['#EFFFEC', '#6ED47C', '#67C073'],
    lime: ['#FBFFE5', '#CEDA52'],
    yellow: ['#FFF7E1', '#F6ECC8', '#FFC700'],
    orange: ['#FFF8F1', '#FFF7E1', '#FF743C'],
  },

  fontFamily: 'Noto Sans, sans-serif',

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },

  lineHeight: 1.5,

  headings: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: 500,
    sizes: {
      h1: { fontSize: 64, lineHeight: 1.375 },
      h2: { fontSize: 36, lineHeight: 1.555 },
      h3: { fontSize: 28, lineHeight: 1.357 },
      h4: { fontSize: 24, lineHeight: 1.166 },
      h5: { fontSize: 20, lineHeight: 1.4 },
      h6: { fontSize: 16, lineHeight: 1.5 },
    },
  },

  breakpoints: {
    xs: 500,
    sm: 768,
    md: 1024,
    lg: 1366,
    xl: 1720,
  },

  other: {
    transitions: {
      all: 'all 200ms ease',
      color: 'color 200ms ease',
      border: 'border 200ms ease',
      background: 'background 200ms ease',
      stroke: 'stroke 200ms ease',
      fill: 'fill 200ms ease',
    },
  },
};

export default theme;
