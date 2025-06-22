import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../cucumber.conf';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { TestDataHelper } from '../helpers/test-data-helper';
import { ApiHelper } from '../api/api-helper';

// UI Step Definitions
Given('I am on the home page', async function(this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.navigateToHomePage();
  const isHomePageVisible = await homePage.isHomePageVisible();
  expect(isHomePageVisible).to.be.true;
});

When('I navigate to the login page', async function(this: CustomWorld) {
  const homePage = new HomePage(this.page!);
  await homePage.clickSignupLoginButton();
});

Given('I have valid login credentials', function(this: CustomWorld) {
  this.testData = TestDataHelper.getTestUserData();
});

Given('I have invalid login credentials with {string} and {string}', function(this: CustomWorld, email: string, password: string) {
  this.testData = {
    email: email,
    password: password
  };
});

When('I enter my email and password', async function(this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.fill('input[data-qa="login-email"]', this.testData.email);
  await loginPage.fill('input[data-qa="login-password"]', this.testData.password);
});

When('I click on the login button', async function(this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  await loginPage.click('button[data-qa="login-button"]');
});

Then('I should be logged in successfully', async function(this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const isLoggedIn = await loginPage.isUserLoggedIn();
  expect(isLoggedIn).to.be.true;
});

Then('I should see my account page', async function(this: CustomWorld) {
  // Verify we're on the account page by checking for specific elements
  const isVisible = await this.page!.isVisible('a:has-text("Delete Account")');
  expect(isVisible).to.be.true;
});

Then('I should see an error message', async function(this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).to.not.be.empty;
});

Then('I should not be logged in', async function(this: CustomWorld) {
  const loginPage = new LoginPage(this.page!);
  const isLoggedIn = await loginPage.isUserLoggedIn();
  expect(isLoggedIn).to.be.false;
});

// API Step Definitions
Given('I have valid API login credentials', function(this: CustomWorld) {
  this.testData = TestDataHelper.getTestUserData();
});

When('I send a login request to the API', async function(this: CustomWorld) {
  const apiHelper = new ApiHelper();
  this.apiResponse = await apiHelper.verifyLogin(this.testData.email, this.testData.password);
});

Then('the API should return a success response', function(this: CustomWorld) {
  expect(this.apiResponse.status).to.equal(200);
  expect(this.apiResponse.data.responseCode).to.equal(200);
});

Then('the response should contain user details', function(this: CustomWorld) {
  expect(this.apiResponse.data.message).to.equal('User exists!');
});
