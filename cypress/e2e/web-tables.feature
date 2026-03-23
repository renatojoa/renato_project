@frontend @regression @exercicio4
Feature: Web Tables Management
  As a user
  I want to manage records in web tables
  So that I can validate CRUD operations

  @smoke @tables @critical
  Scenario: Create, edit, and delete a record in web table
    Given I am on the DemoQA homepage
    When I navigate to Elements section
    And I click on Web Tables
    And I create a new record with random data
    Then the new record should appear in the table
    When I edit the newly created record
    Then the record should be updated
    When I delete the edited record
    Then the record should be removed from the table
