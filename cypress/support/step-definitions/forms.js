import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import PracticeFormPage from '../pages/PracticeFormPage';
import DataHelper from '../helpers/dataHelper';

let formData;

When('I click on Practice Form', () => {
  PracticeFormPage.clickPracticeForm();
});

When('I fill all form fields with random data', () => {
  formData = DataHelper.generateFormData();
  cy.wrap(formData).as('formData');
  PracticeFormPage.fillForm(formData);
});

When('I upload a text file', () => {
  PracticeFormPage.uploadFile('sample-upload.txt');
});

When('I submit the form', () => {
  PracticeFormPage.submit();
});

Then('a confirmation popup should be displayed', () => {
  cy.get('@formData').then((data) => {
    PracticeFormPage.verifySubmittedData(data);
  });
});

When('I close the popup', () => {
  PracticeFormPage.closeModal();
});

Then('the form should be ready for new submission', () => {
  // Verify form is visible and ready for interaction
  PracticeFormPage.elements.firstName().should('be.visible').and('not.be.disabled');
  PracticeFormPage.elements.lastName().should('be.visible').and('not.be.disabled');
  PracticeFormPage.elements.email().should('be.visible').and('not.be.disabled');
  PracticeFormPage.elements.submitButton().should('be.visible').and('not.be.disabled');
});
