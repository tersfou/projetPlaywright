import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { BrowserContext, Page, Browser, chromium } from 'playwright';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Custom world class for Cucumber
export class CustomWorld extends World {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  page: Page | undefined;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    // Launch browser
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS !== 'false',
      slowMo: process.env.SLOW_MO ? parseInt(process.env.SLOW_MO) : 0
    });

    // Create a new context for each scenario
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      recordVideo: process.env.RECORD_VIDEO === 'true' 
        ? { dir: 'reports/videos/' } 
        : undefined
    });

    // Create a new page in the context
    this.page = await this.context.newPage();
  }

  async teardown() {
    // Close browser after scenario
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);
