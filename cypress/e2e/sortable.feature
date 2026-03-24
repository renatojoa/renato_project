@frontend @regression @exercicio6
Feature: Sortable List

  @smoke @sortable @critical
  Scenario: Sort list items using drag and drop
    Given I am on the DemoQA homepage
    When I navigate to Interactions section
    And I click on Sortable
    Then I should see a sortable list
    When I drag and drop to sort the list in ascending order
    Then the list should be in ascending order
