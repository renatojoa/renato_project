import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SortablePage from '../pages/SortablePage';

When('I click on Sortable', () => {
  SortablePage.clickSortable();
});

Then('I should see a sortable list', () => {
  cy.log('🔍 Verificando se a lista sortable está visível...');
  SortablePage.elements.listItems().should('have.length.greaterThan', 0);

  SortablePage.getListItemTexts().then(items => {
    cy.log(`📋 Lista atual: ${items.join(', ')}`);
    cy.log(`✅ Lista sortable encontrada com ${items.length} itens!`);
  });
});

When('I drag and drop to sort the list in ascending order', () => {
  cy.log('🔍 Verificando se a lista já está ordenada...');

  SortablePage.isInAscendingOrder().then(isOrdered => {
    if (isOrdered) {
      cy.log('✅ Lista já está em ordem crescente numérica! Nenhuma ação necessária.');
    } else {
      SortablePage.getListItemTexts().then(items => {
        cy.log(`📋 Ordem atual: ${items.join(', ')}`);
        cy.log('🔄 Lista não está ordenada. Iniciando drag and drop...');
        SortablePage.sortInAscendingOrder();
        cy.log('✅ Drag and drop concluído!');
      });
    }
  });
});

Then('the list should be in ascending order', () => {
  cy.log('🔍 Verificando se a lista está em ordem crescente...');

  SortablePage.getListItemTexts().then(items => {
    cy.log(`📋 Ordem final: ${items.join(', ')}`);

    // Define numeric order for number words
    const numberOrder = { 'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6 };
    const sorted = [...items].sort((a, b) => numberOrder[a] - numberOrder[b]);

    expect(JSON.stringify(items)).to.equal(JSON.stringify(sorted));
    cy.log('✅ Lista está em ordem crescente numérica (validado com sucesso)!');
  });
});
