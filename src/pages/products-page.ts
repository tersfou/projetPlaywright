import { Page } from 'playwright';
import { BasePage } from './base-page';

/**
 * Products Page Object representing the products page of the Automation Exercise website
 */
export class ProductsPage extends BasePage {
  // Selectors
  private readonly productsListSelector = '.features_items';
  private readonly searchInputSelector = '#search_product';
  private readonly searchButtonSelector = '#submit_search';
  private readonly productCardSelector = '.product-image-wrapper';
  private readonly addToCartButtonSelector = '.add-to-cart';
  private readonly viewProductButtonSelector = '.choose a';
  private readonly productNameSelector = '.productinfo p';
  private readonly productPriceSelector = '.productinfo h2';
  private readonly continueShoppingButtonSelector = '.btn-success';
  private readonly viewCartButtonSelector = 'p a';
  private readonly searchedProductsSelector = '.features_items h2';

  /**
   * Constructor for ProductsPage
   * @param page Playwright page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the products page
   */
  async navigateToProductsPage(): Promise<void> {
    await this.navigate('/products');
  }

  /**
   * Verify that products page is visible
   * @returns True if products page is visible
   */
  async isProductsPageVisible(): Promise<boolean> {
    return await this.isVisible(this.productsListSelector);
  }

  /**
   * Search for a product
   * @param productName Product name to search for
   */
  async searchProduct(productName: string): Promise<void> {
    await this.fill(this.searchInputSelector, productName);
    await this.click(this.searchButtonSelector);
  }

  /**
   * Verify that search results are visible
   * @returns True if search results are visible
   */
  async areSearchResultsVisible(): Promise<boolean> {
    return await this.isVisible(this.searchedProductsSelector);
  }

  /**
   * Get number of products displayed
   * @returns Number of products
   */
  async getNumberOfProducts(): Promise<number> {
    await this.waitForElement(this.productCardSelector);
    return (await this.page.$$(this.productCardSelector)).length;
  }

  /**
   * Add product to cart by index
   * @param index Index of the product to add (0-based)
   */
  async addProductToCart(index: number): Promise<void> {
    const products = await this.page.$$(this.productCardSelector);
    if (index >= 0 && index < products.length) {
      // Hover over the product to make the add to cart button visible
      await products[index].hover();
      // Get all add to cart buttons and click the one at the specified index
      const addToCartButtons = await this.page.$$(this.addToCartButtonSelector);
      await addToCartButtons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range (0-${products.length - 1})`);
    }
  }

  /**
   * Click on 'Continue Shopping' button after adding product to cart
   */
  async clickContinueShopping(): Promise<void> {
    await this.click(this.continueShoppingButtonSelector);
  }

  /**
   * Click on 'View Cart' button after adding product to cart
   */
  async clickViewCart(): Promise<void> {
    await this.click(this.viewCartButtonSelector);
  }

  /**
   * View product details by index
   * @param index Index of the product to view (0-based)
   */
  async viewProductDetails(index: number): Promise<void> {
    const viewProductButtons = await this.page.$$(this.viewProductButtonSelector);
    if (index >= 0 && index < viewProductButtons.length) {
      await viewProductButtons[index].click();
    } else {
      throw new Error(`Product index ${index} is out of range (0-${viewProductButtons.length - 1})`);
    }
  }

  /**
   * Get product name by index
   * @param index Index of the product (0-based)
   * @returns Product name
   */
  async getProductName(index: number): Promise<string> {
    const productNames = await this.page.$$(this.productNameSelector);
    if (index >= 0 && index < productNames.length) {
      return await productNames[index].textContent() || '';
    }
    throw new Error(`Product index ${index} is out of range (0-${productNames.length - 1})`);
  }

  /**
   * Get product price by index
   * @param index Index of the product (0-based)
   * @returns Product price
   */
  async getProductPrice(index: number): Promise<string> {
    const productPrices = await this.page.$$(this.productPriceSelector);
    if (index >= 0 && index < productPrices.length) {
      return await productPrices[index].textContent() || '';
    }
    throw new Error(`Product index ${index} is out of range (0-${productPrices.length - 1})`);
  }
}
