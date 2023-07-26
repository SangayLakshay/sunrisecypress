const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fileServerFolder: '.',
  fixturesFolder: './cypress/fixtures',
  video: true,
  videosFolder: './cypress/record/videos',
  screenshotsFolder: './cypress/record/screenshots',
  chromeWebSecurity: false,
  viewportHeight: 1080,
  viewportWidth: 1920,
  requestTimeout: 5000,
  waitForAnimations: true,
  retries: 0,
  watchForFileChanges: false,
  defaultCommandTimeout: 10000,

  env: {
    example: 'Hello'
  },

  e2e: {
    baseUrl: 'https://onehub-next.selise.dev/auth',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  }
});
