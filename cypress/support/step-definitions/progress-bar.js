import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProgressBarPage from '../pages/ProgressBarPage';

When('I click on Progress Bar', () => {
  ProgressBarPage.clickProgressBar();
});

When('I click on Start button', () => {
  cy.log('▶️ Clicando no botão Start...');
  ProgressBarPage.start();
  cy.log('✅ Barra de progresso iniciada!');
});

When('I stop before reaching {int}%', (percentage) => {
  cy.log(`⏸️ Tentando parar antes de ${percentage}%...`);
  ProgressBarPage.stopBeforeReaching(percentage);
  cy.log(`✅ Parou antes de ${percentage}%!`);
});

Then('the progress value should be less than or equal to {int}%', (percentage) => {
  cy.log(`🔍 Verificando se o progresso está <= ${percentage}%...`);
  ProgressBarPage.verifyProgressValue('<=', percentage);

  ProgressBarPage.getProgressValue().then(value => {
    cy.log(`📊 Valor atual do progresso: ${value}%`);
    cy.log(`✅ Progresso está <= ${percentage}% (validado com sucesso)!`);
  });
});

When('I click Start button again', () => {
  cy.log('▶️ Clicando no botão Start novamente...');
  ProgressBarPage.start();
  cy.log('✅ Barra de progresso reiniciada!');
});

When('I wait until progress reaches {int}%', (percentage) => {
  cy.log(`⏳ Aguardando progresso chegar a ${percentage}%...`);
  ProgressBarPage.waitForProgress(percentage, '>=');
  cy.log(`✅ Progresso atingiu ${percentage}%!`);
});

Then('I should be able to reset the progress bar', () => {
  cy.log('🔄 Clicando no botão Reset...');
  ProgressBarPage.reset();
  ProgressBarPage.startShouldBeDisplayed();
  cy.log('✅ Barra de progresso resetada!');

  ProgressBarPage.getProgressValue().then(value => {
    cy.log(`📊 Valor após reset: ${value}%`);
    expect(value).to.be.equal(0);
    cy.log('✅ Barra de progresso voltou ao início (0%)!');
  });
});
