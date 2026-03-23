class WebTablesPage {
  elements = {
    webTablesMenu: () => cy.contains('.text', 'Web Tables'),
    addButton: () => cy.get('#addNewRecordButton'),
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    age: () => cy.get('#age'),
    salary: () => cy.get('#salary'),
    department: () => cy.get('#department'),
    submitButton: () => cy.get('#submit'),
    table: () => cy.get('.table-striped'),
    tableRows: () => cy.get('.table-striped tbody tr'),
    tableCells: () => cy.get('.table-striped tbody td')
  };

  clickWebTables() {
    this.elements.webTablesMenu().scrollIntoView().click();
    this.removeAds();
  }

  removeAds() {
    cy.document().then(doc => {
      const footer = doc.querySelector('footer');
      if (footer) footer.remove();
      const ads = doc.querySelectorAll('ins, iframe[id*="google_ads"]');
      ads.forEach(ad => ad.remove());
    });
  }

  clickAdd() {
    this.elements.addButton().click();
  }

  fillForm(data) {
    this.elements.firstName().clear().type(data.firstName);
    this.elements.lastName().clear().type(data.lastName);
    this.elements.email().clear().type(data.email);
    this.elements.age().clear().type(data.age.toString());
    this.elements.salary().clear().type(data.salary.toString());
    this.elements.department().clear().type(data.department);
  }

  submit() {
    this.elements.submitButton().click();
  }

  createRecord(data) {
    this.clickAdd();
    this.fillForm(data);
    this.submit();
  }

  editRecord(email, newData) {
    cy.log(`🔍 Procurando registro com email: ${email}`);
    cy.get('.table-striped tbody').contains('td', email)
      .parent('tr')
      .find('[title="Edit"]')
      .scrollIntoView()
      .click();
    cy.log('✏️ Clicou no botão Edit');

    this.fillForm(newData);
    this.submit();
  }

  deleteRecord(email) {
    cy.log(`🗑️ Deletando registro com email: ${email}`);
    cy.get('.table-striped tbody').contains('td', email)
      .parent('tr')
      .find('[title="Delete"]')
      .scrollIntoView()
      .click();
    cy.log('✅ Clicou no botão Delete');
  }

  verifyRecordExists(email) {
    cy.log(`🔍 Verificando se o registro existe: ${email}`);
    cy.wait(1000);
    cy.get('.table-striped tbody').contains('td', email).should('be.visible');
    cy.log('✅ Registro encontrado na tabela!');
  }

  verifyRecordNotExists(email) {
    cy.log(`🔍 Verificando se o registro foi deletado: ${email}`);
    cy.get('.table-striped tbody').contains('td', email).should('not.exist');
    cy.log('✅ Registro não encontrado na tabela (deletado com sucesso)!');
  }
}

export default new WebTablesPage();
