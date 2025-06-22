import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { CustomWorld } from '../cucumber.conf';
import { ApiHelper } from '../api/api-helper';
import { TestDataHelper } from '../helpers/test-data-helper';

// API Step Definitions
When('I send a GET request to {string} endpoint', async function(this: CustomWorld, endpoint: string) {
  const apiHelper = new ApiHelper();
  this.apiResponse = await apiHelper.get(endpoint);
});

When('I send a POST request to {string} with:', async function(this: CustomWorld, endpoint: string, dataTable: any) {
  const apiHelper = new ApiHelper();
  const data = dataTable.rowsHash();
  this.apiResponse = await apiHelper.post(endpoint, data);
});

When('I send a POST request to {string} with user data', async function(this: CustomWorld, endpoint: string) {
  const apiHelper = new ApiHelper();
  this.apiResponse = await apiHelper.post(endpoint, this.testData);
});

When('I send a DELETE request to {string} with user credentials', async function(this: CustomWorld, endpoint: string) {
  const apiHelper = new ApiHelper();
  this.apiResponse = await apiHelper.delete(`${endpoint}?email=${this.testData.email}&password=${this.testData.password}`);
});

Then('the API should return status code {int}', function(this: CustomWorld, statusCode: number) {
  expect(this.apiResponse.status).to.equal(statusCode);
});

Then('the response should contain {string} list', function(this: CustomWorld, property: string) {
  expect(this.apiResponse.data).to.have.property(property);
  expect(this.apiResponse.data[property]).to.be.an('array');
});

Then('the response should have {string} as {int}', function(this: CustomWorld, property: string, value: number) {
  expect(this.apiResponse.data).to.have.property(property);
  expect(this.apiResponse.data[property]).to.equal(value);
});

Then('the response should contain {string}', function(this: CustomWorld, message: string) {
  expect(this.apiResponse.data.message).to.include(message);
});

Then('the response should contain {string} as {string}', function(this: CustomWorld, property: string, value: string) {
  expect(this.apiResponse.data).to.have.property(property);
  expect(this.apiResponse.data[property]).to.equal(value);
});

Given('I have random user data', function(this: CustomWorld) {
  this.testData = TestDataHelper.generateRandomUserData();
});

// Common hooks for API tests
Before({ tags: '@api' }, function(this: CustomWorld) {
  // Setup for API tests
  this.apiHelper = new ApiHelper();
});

After({ tags: '@api' }, async function(this: CustomWorld) {
  // Cleanup after API tests
  // For example, delete any test accounts created during tests
  if (this.testData && this.testData.email && this.testData.password) {
    try {
      await this.apiHelper.deleteAccount(this.testData.email, this.testData.password);
    } catch (error) {
      // Ignore errors during cleanup
      console.log('Cleanup error:', error);
    }
  }
});
