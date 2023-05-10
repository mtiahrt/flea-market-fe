// const { defineConfig } = require('cypress')
//
// module.exports = defineConfig({
//   e2e: {
//     // We've imported your old cypress plugins here.
//     // You may want to clean this up later by importing these.
//     setupNodeEvents(on, config) {
//       return require('./cypress/plugins/index.js')(on, config)
//     },
//   },
// })
const { defineConfig } = require('cypress');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const admin = require('firebase-admin');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // NOTE: Make supportFile exists if separate location is provided
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin);
      // NOTE: If not setting GCLOUD_PROJECT env variable, project can be set like so:
      // return cypressFirebasePlugin(on, config, admin, { projectId: 'some-project' });
    },
  },
});
