@frontend @regression
Feature: Practice Form Submission
  As a user
  I want to fill and submit the practice form
  So that I can validate form submission functionality

  @smoke @forms @critical
  Scenario: Fill and submit practice form successfully
    Given I am on the DemoQA homepage
    When I navigate to Forms section
    And I click on Practice Form
    And I fill all form fields with random data
    And I upload a text file
    And I submit the form
    Then a confirmation popup should be displayed
    When I close the popup
    Then the form should be ready for new submission
