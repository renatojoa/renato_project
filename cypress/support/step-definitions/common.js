import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../pages/HomePage';

Given('I am on the DemoQA homepage', () => {
  HomePage.visit();
});

When('I navigate to Elements section', () => {
  HomePage.goToElements();
});

When('I navigate to Forms section', () => {
  HomePage.goToForms();
});

When('I navigate to Alerts, Frame & Windows section', () => {
  HomePage.goToAlertsWindows();
});

When('I navigate to Widgets section', () => {
  HomePage.goToWidgets();
});

When('I navigate to Interactions section', () => {
  HomePage.goToInteractions();
});
