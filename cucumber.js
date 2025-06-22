module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      '@cucumber/pretty-formatter',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true
  }
};
