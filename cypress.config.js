const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{feature,cy.js}',
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },

  env: {
    apiUrl: 'https://demoqa.com'
  },

  retries: {
    runMode: 2,
    openMode: 0
  }
});
