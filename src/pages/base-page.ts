import { Page } from 'playwright';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Base Page class that provides common functionality for all page objects
 */
export class BasePage {
  readonly page: Page;
  readonly baseUrl: string;
  readonly timeout: number;

  /**
   * Constructor for BasePage
   * @param page Playwright page object
   */
  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://www.automationexercise.com';
    this.timeout = process.env.DEFAULT_TIMEOUT ? parseInt(process.env.DEFAULT_TIMEOUT) : 30000;
  }

  /**
   * Navigate to a specific URL
   * @param path Path to navigate to (will be appended to baseUrl)
   */
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${this.baseUrl}${path}`, {
      waitUntil: 'networkidle',
      timeout: this.timeout
    });
  }

  /**
   * Wait for element to be visible
   * @param selector Element selector
   * @param timeout Timeout in milliseconds
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: timeout || this.timeout
    });
  }

  /**
   * Click on an element
   * @param selector Element selector
   */
  async click(selector: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  /**
   * Fill a form field
   * @param selector Element selector
   * @param value Value to fill
   */
  async fill(selector: string, value: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
  }

  /**
   * Get text from an element
   * @param selector Element selector
   * @returns Text content of the element
   */
  async getText(selector: string): Promise<string> {
    await this.waitForElement(selector);
    return await this.page.textContent(selector) || '';
  }

  /**
   * Check if element is visible
   * @param selector Element selector
   * @returns True if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Take a screenshot
   * @param name Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }
}
