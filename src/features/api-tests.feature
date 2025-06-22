Feature: API Testing
  As a developer of the Automation Exercise website
  I want to test the API endpoints
  So that I can ensure they work correctly

  @api @smoke @regression
  Scenario: Get all products list
    When I send a GET request to "/productsList" endpoint
    Then the API should return status code 200
    And the response should contain "products" list
    And the response should have "responseCode" as 200

  @api @regression
  Scenario: Get all brands list
    When I send a GET request to "/brandsList" endpoint
    Then the API should return status code 200
    And the response should contain "brands" list
    And the response should have "responseCode" as 200

  @api @regression
  Scenario Outline: Verify login with different credentials
    When I send a POST request to "/verifyLogin" with:
      | email    | <email>    |
      | password | <password> |
    Then the API should return status code 200
    And the response should have "responseCode" as <responseCode>
    And the response should contain "<message>"

    Examples:
      | email                | password    | responseCode | message                     |
      | testuser@example.com | Password123 | 200          | User exists!                |
      | invalid@example.com  | wrongpass   | 404          | User not found!             |
      |                      | password123 | 400          | Bad request, email required |
      | testuser@example.com |             | 400          | Bad request, password required |

  @api @regression
  Scenario: Search product
    When I send a POST request to "/searchProduct" with:
      | search_product | Blue Top |
    Then the API should return status code 200
    And the response should have "responseCode" as 200
    And the response should contain "products" list

  @api @regression
  Scenario: Create and delete user account
    Given I have random user data
    When I send a POST request to "/createAccount" with user data
    Then the API should return status code 200
    And the response should have "responseCode" as 201
    And the response should contain "message" as "User created!"
    When I send a DELETE request to "/deleteAccount" with user credentials
    Then the API should return status code 200
    And the response should have "responseCode" as 200
    And the response should contain "message" as "Account deleted!"
