@frontend @regression @exercicio5
Feature: Progress Bar

  @smoke @progressbar @critical
  Scenario: Start progress bar and stop before 25%
    Given I am on the DemoQA homepage
    When I navigate to Widgets section
    And I click on Progress Bar
    And I click on Start button
    And I stop before reaching 25%
    Then the progress value should be less than or equal to 25%
    When I click Start button again
    And I wait until progress reaches 100%
    Then I should be able to reset the progress bar
