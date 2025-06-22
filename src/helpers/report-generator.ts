import * as reporter from 'cucumber-html-reporter';
import * as fs from 'fs';
import * as path from 'path';

// Define report options
const options: reporter.Options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, '../../reports/cucumber-report.json'),
  output: path.join(__dirname, '../../reports/cucumber-report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    'App Version': 'Automation Exercise 1.0',
    'Test Environment': process.env.NODE_ENV || 'Test',
    'Browser': process.env.BROWSER || 'Chrome',
    'Platform': process.platform,
    'Executed': 'Local'
  }
};

// Check if the report JSON file exists
if (fs.existsSync(options.jsonFile)) {
  reporter.generate(options);
  console.log(`HTML report generated at: ${options.output}`);
} else {
  console.error(`No report JSON found at: ${options.jsonFile}`);
  console.error('Run tests first to generate the JSON report');
}
