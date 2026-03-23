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
    tableRows: () => cy.get('.rt-tr-group')
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
    cy.contains('[role="gridcell"]', email)
      .parent()
      .find('[title="Edit"]')
      .scrollIntoView()
      .click();

    this.fillForm(newData);
    this.submit();
  }

  deleteRecord(email) {
    cy.contains('[role="gridcell"]', email)
      .parent()
      .find('[title="Delete"]')
      .scrollIntoView()
      .click();
  }

  verifyRecordExists(email) {
    cy.contains('[role="gridcell"]', email).should('exist');
  }

  verifyRecordNotExists(email) {
    cy.contains('[role="gridcell"]', email).should('not.exist');
  }
}

export default new WebTablesPage();
