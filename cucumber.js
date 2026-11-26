// Cucumber configuration (ESM). Run with `npm run bdd`.
export default {
  paths: ['features/**/*.feature'],
  import: ['features/support/**/*.js', 'features/step_definitions/**/*.js'],
  format: ['progress-bar', 'summary'],
  formatOptions: { snippetInterface: 'async-await' },
  strict: true,
};
