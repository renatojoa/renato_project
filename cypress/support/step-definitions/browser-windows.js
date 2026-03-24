import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BrowserWindowsPage from '../pages/BrowserWindowsPage';

When('I click on Browser Windows', () => {
  BrowserWindowsPage.clickBrowserWindows();
});

When('I click on New Window button', () => {
  BrowserWindowsPage.clickNewWindow();
});

Then('a new window should open', () => {
  BrowserWindowsPage.verifyNewWindowOpened();
});

Then('I should see the message {string}', (expectedMessage) => {
  BrowserWindowsPage.verifyNewWindowMessage(expectedMessage);
});

When('I close the new window', () => {
  BrowserWindowsPage.closeNewWindow();
});
