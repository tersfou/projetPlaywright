import { Page } from 'playwright';
import { BasePage } from './base-page';

/**
 * Home Page Object representing the main page of the Automation Exercise website
 */
export class HomePage extends BasePage {
  // Selectors
  private readonly logoSelector = 'img[alt="Website for automation practice"]';
  private readonly signupLoginButtonSelector = 'a[href="/login"]';
  private readonly productsButtonSelector = 'a[href="/products"]';
  private readonly cartButtonSelector = 'a[href="/view_cart"]';
  private readonly contactUsButtonSelector = 'a[href="/contact_us"]';
  private readonly testCasesButtonSelector = 'a[href="/test_cases"]';
  private readonly subscriptionEmailSelector = '#susbscribe_email';
  private readonly subscribeButtonSelector = '#subscribe';
  private readonly subscriptionSuccessSelector = '.alert-success';

  /**
   * Constructor for HomePage
   * @param page Playwright page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page
   */
  async navigateToHomePage(): Promise<void> {
    await this.navigate('/');
  }

  /**
   * Verify that home page is visible
   * @returns True if home page is visible
   */
  async isHomePageVisible(): Promise<boolean> {
    return await this.isVisible(this.logoSelector);
  }

  /**
   * Click on 'Signup / Login' button
   */
  async clickSignupLoginButton(): Promise<void> {
    await this.click(this.signupLoginButtonSelector);
  }

  /**
   * Click on 'Products' button
   */
  async clickProductsButton(): Promise<void> {
    await this.click(this.productsButtonSelector);
  }

  /**
   * Click on 'Cart' button
   */
  async clickCartButton(): Promise<void> {
    await this.click(this.cartButtonSelector);
  }

  /**
   * Click on 'Contact Us' button
   */
  async clickContactUsButton(): Promise<void> {
    await this.click(this.contactUsButtonSelector);
  }

  /**
   * Click on 'Test Cases' button
   */
  async clickTestCasesButton(): Promise<void> {
    await this.click(this.testCasesButtonSelector);
  }

  /**
   * Subscribe to newsletter
   * @param email Email to subscribe with
   */
  async subscribeToNewsletter(email: string): Promise<void> {
    await this.fill(this.subscriptionEmailSelector, email);
    await this.click(this.subscribeButtonSelector);
  }

  /**
   * Verify subscription success message
   * @returns True if subscription success message is visible
   */
  async isSubscriptionSuccessful(): Promise<boolean> {
    return await this.isVisible(this.subscriptionSuccessSelector);
  }
}
