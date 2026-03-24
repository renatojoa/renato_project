import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import WebTablesPage from '../pages/WebTablesPage';
import DataHelper from '../helpers/dataHelper';

let recordData;
let updatedRecordData;
let bulkRecords = [];

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

When('I create {int} new records with random data', (count) => {
  cy.log(`📝 Criando ${count} registros dinamicamente...`);
  bulkRecords = [];

  for (let i = 0; i < count; i++) {
    const newRecord = DataHelper.generateRecordData();
    cy.log(`➕ Criando registro ${i + 1}/${count}: ${newRecord.email}`);
    WebTablesPage.createRecord(newRecord);
    bulkRecords.push(newRecord);
  }

  cy.wrap(bulkRecords).as('bulkRecords');
  cy.log(`✅ Total de ${count} registros criados com sucesso!`);
});

Then('all {int} records should appear in the table', (count) => {
  cy.log(`🔍 Verificando se todos os ${count} registros estão na tabela...`);

  bulkRecords.forEach((record, index) => {
    cy.log(`✓ Verificando registro ${index + 1}/${count}: ${record.email}`);
    WebTablesPage.verifyRecordExists(record.email);
  });

  cy.log(`✅ Todos os ${count} registros foram encontrados na tabela!`);
});

When('I delete all created records', () => {
  const totalRecords = bulkRecords.length;
  cy.log(`🗑️ Deletando todos os ${totalRecords} registros criados...`);

  bulkRecords.forEach((record, index) => {
    cy.log(`🗑️ Deletando registro ${index + 1}/${totalRecords}: ${record.email}`);
    WebTablesPage.deleteRecord(record.email);
  });

  cy.log(`✅ Todos os ${totalRecords} registros foram deletados!`);
});

Then('all created records should be removed from the table', () => {
  const totalRecords = bulkRecords.length;
  cy.log(`🔍 Verificando se todos os ${totalRecords} registros foram removidos...`);

  bulkRecords.forEach((record, index) => {
    cy.log(`✓ Verificando remoção ${index + 1}/${totalRecords}: ${record.email}`);
    WebTablesPage.verifyRecordNotExists(record.email);
  });

  cy.log(`✅ Todos os ${totalRecords} registros foram removidos com sucesso!`);
  bulkRecords = [];
});
