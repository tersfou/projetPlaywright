import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../cucumber.conf';
import { HomePage } from '../pages/home-page';
import { ProductsPage } from '../pages/products-page';
import { ApiHelper } from '../api/api-helper';

// UI Step Definitions
When('I navigate to the products page', async function(this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.clickProductsButton();
});

Given('the products page is displayed', async function(this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  const isProductsPageVisible = await productsPage.isProductsPageVisible();
  expect(isProductsPageVisible).to.be.true;
});

When('I search for {string}', async function(this: CustomWorld, searchTerm: string) {
  const productsPage = new ProductsPage(this.page!);
  this.searchTerm = searchTerm;
  await productsPage.searchProduct(searchTerm);
});

Then('I should see products related to my search', async function(this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  const areSearchResultsVisible = await productsPage.areSearchResultsVisible();
  expect(areSearchResultsVisible).to.be.true;
});

Then('the search results should contain {string}', async function(this: CustomWorld, productName: string) {
  // Check if any product in the search results contains the given name
  const productsPage = new ProductsPage(this.page!);
  const numProducts = await productsPage.getNumberOfProducts();
  
  let found = false;
  for (let i = 0; i < numProducts; i++) {
    const name = await productsPage.getProductName(i);
    if (name.includes(productName)) {
      found = true;
      break;
    }
  }
  
  expect(found).to.be.true;
});

Then('I should see no products in the search results', async function(this: CustomWorld) {
  const productsPage = new ProductsPage(this.page!);
  const numProducts = await productsPage.getNumberOfProducts();
  expect(numProducts).to.equal(0);
});

Then('I should see {int} or more products in the results', async function(this: CustomWorld, expectedCount: number) {
  const productsPage = new ProductsPage(this.page!);
  const numProducts = await productsPage.getNumberOfProducts();
  expect(numProducts).to.be.at.least(expectedCount);
});

// API Step Definitions
Given('I have a product search term {string}', function(this: CustomWorld, searchTerm: string) {
  this.searchTerm = searchTerm;
});

When('I send a search request to the API', async function(this: CustomWorld) {
  const apiHelper = new ApiHelper();
  this.apiResponse = await apiHelper.searchProduct(this.searchTerm);
});

Then('the response should contain product results', function(this: CustomWorld) {
  expect(this.apiResponse.data).to.have.property('products');
  expect(this.apiResponse.data.products).to.be.an('array');
  expect(this.apiResponse.data.products.length).to.be.at.least(1);
});
