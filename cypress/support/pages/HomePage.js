class HomePage {
  elements = {
    elementsCard: () => cy.contains('.card', 'Elements'),
    formsCard: () => cy.contains('.card', 'Forms'),
    alertsWindowsCard: () => cy.contains('.card', 'Alerts, Frame & Windows'),
    widgetsCard: () => cy.contains('.card', 'Widgets'),
    interactionsCard: () => cy.contains('.card', 'Interactions')
  };

  visit() {
    cy.visit('/');
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

  goToElements() {
    this.elements.elementsCard().scrollIntoView().click();
  }

  goToForms() {
    this.elements.formsCard().scrollIntoView().click();
  }

  goToAlertsWindows() {
    this.elements.alertsWindowsCard().scrollIntoView().click();
  }

  goToWidgets() {
    this.elements.widgetsCard().scrollIntoView().click();
  }

  goToInteractions() {
    this.elements.interactionsCard().scrollIntoView().click();
  }
}

export default new HomePage();
