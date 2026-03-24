@frontend @regression @exercicio3
Feature: Browser Windows

  @smoke @windows @critical
  Scenario: Open new window and verify message
    Given I am on the DemoQA homepage
    When I navigate to Alerts, Frame & Windows section
    And I click on Browser Windows
    And I click on New Window button
    Then a new window should open
    And I should see the message "This is a sample page"
    When I close the new window
