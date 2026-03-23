import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import WebTablesPage from '../pages/WebTablesPage';
import DataHelper from '../helpers/dataHelper';

let recordData;
let updatedRecordData;

When('I click on Web Tables', () => {
  WebTablesPage.clickWebTables();
});

When('I create a new record with random data', () => {
  recordData = DataHelper.generateRecordData();
  cy.wrap(recordData).as('recordData');
  WebTablesPage.createRecord(recordData);
});

Then('the new record should appear in the table', () => {
  WebTablesPage.verifyRecordExists(recordData.email);
});

When('I edit the newly created record', () => {
  updatedRecordData = DataHelper.generateRecordData();
  updatedRecordData.email = recordData.email; // Keep same email
  cy.wrap(updatedRecordData).as('updatedRecordData');
  WebTablesPage.editRecord(recordData.email, updatedRecordData);
  recordData = updatedRecordData;
});

Then('the record should be updated', () => {
  WebTablesPage.verifyRecordExists(recordData.email);
});

When('I delete the edited record', () => {
  WebTablesPage.deleteRecord(recordData.email);
});

Then('the record should be removed from the table', () => {
  WebTablesPage.verifyRecordNotExists(recordData.email);
});
