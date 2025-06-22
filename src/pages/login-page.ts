import { Page } from 'playwright';
import { BasePage } from './base-page';

/**
 * Login Page Object representing the login/signup page of the Automation Exercise website
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly loginFormSelector = '.login-form';
  private readonly signupFormSelector = '.signup-form';
  private readonly loginEmailSelector = 'input[data-qa="login-email"]';
  private readonly loginPasswordSelector = 'input[data-qa="login-password"]';
  private readonly loginButtonSelector = 'button[data-qa="login-button"]';
  private readonly signupNameSelector = 'input[data-qa="signup-name"]';
  private readonly signupEmailSelector = 'input[data-qa="signup-email"]';
  private readonly signupButtonSelector = 'button[data-qa="signup-button"]';
  private readonly errorMessageSelector = '.login-form p';
  private readonly loggedInAsSelector = 'a:has-text("Logged in as")';

  /**
   * Constructor for LoginPage
   * @param page Playwright page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigate('/login');
  }

  /**
   * Verify that login page is visible
   * @returns True if login page is visible
   */
  async isLoginPageVisible(): Promise<boolean> {
    return await this.isVisible(this.loginFormSelector) && await this.isVisible(this.signupFormSelector);
  }

  /**
   * Login with email and password
   * @param email Email to login with
   * @param password Password to login with
   */
  async login(email: string, password: string): Promise<void> {
    await this.fill(this.loginEmailSelector, email);
    await this.fill(this.loginPasswordSelector, password);
    await this.click(this.loginButtonSelector);
  }

  /**
   * Sign up with name and email
   * @param name Name to sign up with
   * @param email Email to sign up with
   */
  async signup(name: string, email: string): Promise<void> {
    await this.fill(this.signupNameSelector, name);
    await this.fill(this.signupEmailSelector, email);
    await this.click(this.signupButtonSelector);
  }

  /**
   * Verify that user is logged in
   * @returns True if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isVisible(this.loggedInAsSelector);
  }

  /**
   * Get login error message
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessageSelector);
  }
}
