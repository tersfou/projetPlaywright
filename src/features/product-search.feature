Feature: Product Search Functionality
  As a user of the Automation Exercise website
  I want to be able to search for products
  So that I can find items I'm interested in

  Background:
    Given I am on the home page
    When I navigate to the products page

  @ui @smoke @regression
  Scenario: Search for an existing product
    Given the products page is displayed
    When I search for "Blue Top"
    Then I should see products related to my search
    And the search results should contain "Blue Top"

  @ui @regression
  Scenario: Search for a non-existing product
    Given the products page is displayed
    When I search for "NonExistingProduct123456789"
    Then I should see no products in the search results

  @ui @regression
  Scenario Outline: Search for different products
    Given the products page is displayed
    When I search for "<product_name>"
    Then I should see <expected_count> or more products in the results

    Examples:
      | product_name | expected_count |
      | Top          | 3              |
      | Dress        | 2              |
      | Men          | 3              |
      | Tshirt       | 1              |

  @api @smoke @regression
  Scenario: Search for a product via API
    Given I have a product search term "Top"
    When I send a search request to the API
    Then the API should return a success response
    And the response should contain product results
