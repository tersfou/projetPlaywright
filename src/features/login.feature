Feature: Login Functionality
  As a user of the Automation Exercise website
  I want to be able to login with my account
  So that I can access my account features

  Background:
    Given I am on the home page
    When I navigate to the login page

  @ui @smoke @regression
  Scenario: Login with valid credentials
    Given I have valid login credentials
    When I enter my email and password
    And I click on the login button
    Then I should be logged in successfully
    And I should see my account page

  @ui @regression
  Scenario Outline: Login with invalid credentials
    Given I have invalid login credentials with "<email>" and "<password>"
    When I enter my email and password
    And I click on the login button
    Then I should see an error message
    And I should not be logged in

    Examples:
      | email                | password    |
      | invalid@example.com  | password123 |
      | testuser@example.com | wrongpass   |
      |                      | password123 |
      | testuser@example.com |             |

  @api @smoke @regression
  Scenario: Verify login via API
    Given I have valid API login credentials
    When I send a login request to the API
    Then the API should return a success response
    And the response should contain user details
