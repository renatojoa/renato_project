class PracticeFormPage {
  elements = {
    practiceFormMenu: () => cy.contains('.text', 'Practice Form'),
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    genderMale: () => cy.get('label[for="gender-radio-1"]'),
    mobile: () => cy.get('#userNumber'),
    dateOfBirth: () => cy.get('#dateOfBirthInput'),
    subjects: () => cy.get('#subjectsInput'),
    hobbiesSports: () => cy.get('label[for="hobbies-checkbox-1"]'),
    uploadPicture: () => cy.get('#uploadPicture'),
    currentAddress: () => cy.get('#currentAddress'),
    stateDropdown: () => cy.get('#state'),
    cityDropdown: () => cy.get('#city'),
    submitButton: () => cy.get('#submit'),
    confirmationModal: () => cy.get('.modal-content'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    modalTable: () => cy.get('.table'),
    closeModalButton: () => cy.get('#closeLargeModal')
  };

  clickPracticeForm() {
    this.elements.practiceFormMenu().scrollIntoView().click();
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

  fillForm(data) {
    this.elements.firstName().clear().type(data.firstName);
    this.elements.lastName().clear().type(data.lastName);
    this.elements.email().clear().type(data.email);
    this.elements.genderMale().scrollIntoView().click();
    this.elements.mobile().clear().type(data.mobile);

    this.elements.subjects().type(data.subject).type('{enter}');

    this.elements.hobbiesSports().scrollIntoView().click();
    this.elements.currentAddress().scrollIntoView().clear().type(data.address);

    // State dropdown - using more reliable approach
    this.elements.stateDropdown().scrollIntoView().click();
    cy.get('div[id^="react-select"][id*="option"]').contains('NCR').click();

    // City dropdown - using more reliable approach
    this.elements.cityDropdown().click();
    cy.get('div[id^="react-select"][id*="option"]').contains('Delhi').click();
  }

  uploadFile(fileName) {
    this.elements.uploadPicture().selectFile(`cypress/fixtures/${fileName}`, { force: true });
  }

  submit() {
    // Wait a bit to ensure form is stable before submitting
    cy.wait(500);
    this.elements.submitButton().scrollIntoView().click({ force: true });
  }

  verifyModalDisplayed() {
    this.elements.confirmationModal().should('be.visible');
    this.elements.modalTitle().should('contain.text', 'Thanks for submitting the form');
  }

  verifySubmittedData(data) {
    // Verify modal is displayed
    this.verifyModalDisplayed();

    cy.log('🔍 VALIDANDO DADOS DO FORMULÁRIO CADASTRADO...');
    cy.log('─────────────────────────────────────────────');

    // Verify student name
    const expectedName = `${data.firstName} ${data.lastName}`;
    cy.log(`📝 Validando Student Name`);
    cy.log(`   Esperado: ${expectedName}`);
    this.elements.modalTable()
      .contains('td', 'Student Name')
      .next()
      .invoke('text')
      .then((actualName) => {
        cy.log(`   Recebido: ${actualName}`);
        expect(actualName).to.equal(expectedName);
        cy.log(`   ✅ Student Name validado com sucesso!`);
      });

    // Verify email
    cy.log(`📧 Validando Student Email`);
    cy.log(`   Esperado: ${data.email}`);
    this.elements.modalTable()
      .contains('td', 'Student Email')
      .next()
      .invoke('text')
      .then((actualEmail) => {
        cy.log(`   Recebido: ${actualEmail}`);
        expect(actualEmail).to.equal(data.email);
        cy.log(`   ✅ Student Email validado com sucesso!`);
      });

    // Verify gender
    cy.log(`👤 Validando Gender`);
    cy.log(`   Esperado: Male`);
    this.elements.modalTable()
      .contains('td', 'Gender')
      .next()
      .invoke('text')
      .then((actualGender) => {
        cy.log(`   Recebido: ${actualGender}`);
        expect(actualGender).to.equal('Male');
        cy.log(`   ✅ Gender validado com sucesso!`);
      });

    // Verify mobile
    cy.log(`📱 Validando Mobile`);
    cy.log(`   Esperado: ${data.mobile}`);
    this.elements.modalTable()
      .contains('td', 'Mobile')
      .next()
      .invoke('text')
      .then((actualMobile) => {
        cy.log(`   Recebido: ${actualMobile}`);
        expect(actualMobile).to.equal(data.mobile);
        cy.log(`   ✅ Mobile validado com sucesso!`);
      });

    // Verify subjects
    cy.log(`📚 Validando Subjects`);
    cy.log(`   Esperado: ${data.subject}`);
    this.elements.modalTable()
      .contains('td', 'Subjects')
      .next()
      .invoke('text')
      .then((actualSubjects) => {
        cy.log(`   Recebido: ${actualSubjects}`);
        expect(actualSubjects).to.equal(data.subject);
        cy.log(`   ✅ Subjects validado com sucesso!`);
      });

    // Verify hobbies
    cy.log(`🎯 Validando Hobbies`);
    cy.log(`   Esperado: Sports`);
    this.elements.modalTable()
      .contains('td', 'Hobbies')
      .next()
      .invoke('text')
      .then((actualHobbies) => {
        cy.log(`   Recebido: ${actualHobbies}`);
        expect(actualHobbies).to.equal('Sports');
        cy.log(`   ✅ Hobbies validado com sucesso!`);
      });

    // Verify address
    cy.log(`🏠 Validando Address`);
    cy.log(`   Esperado: ${data.address}`);
    this.elements.modalTable()
      .contains('td', 'Address')
      .next()
      .invoke('text')
      .then((actualAddress) => {
        cy.log(`   Recebido: ${actualAddress}`);
        expect(actualAddress).to.equal(data.address);
        cy.log(`   ✅ Address validado com sucesso!`);
      });

    // Verify state and city
    const expectedStateCity = 'NCR Delhi';
    cy.log(`📍 Validando State and City`);
    cy.log(`   Esperado: ${expectedStateCity}`);
    this.elements.modalTable()
      .contains('td', 'State and City')
      .next()
      .invoke('text')
      .then((actualStateCity) => {
        cy.log(`   Recebido: ${actualStateCity}`);
        expect(actualStateCity).to.equal(expectedStateCity);
        cy.log(`   ✅ State and City validado com sucesso!`);
      });

    cy.log('─────────────────────────────────────────────');
    cy.log('✅ TODOS OS DADOS FORAM VALIDADOS COM SUCESSO!');
    cy.log('✅ FORMULÁRIO CADASTRADO CORRETAMENTE!');
  }

  closeModal() {
    this.elements.closeModalButton().click();
  }
}

export default new PracticeFormPage();
