const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/commands.js',
    setupNodeEvents(on, config) {},
    experimentalSessionAndOrigin: true,
  },
});
