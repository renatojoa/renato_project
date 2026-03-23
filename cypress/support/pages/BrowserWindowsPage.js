class BrowserWindowsPage {
  elements = {
    browserWindowsMenu: () => cy.contains('.text', 'Browser Windows'),
    newWindowButton: () => cy.get('#windowButton'),
    sampleHeading: () => cy.get('#sampleHeading')
  };

  clickBrowserWindows() {
    this.elements.browserWindowsMenu().scrollIntoView().click();
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

  clickNewWindow() {
    // Store current window reference
    cy.window().then(win => {
      cy.stub(win, 'open').as('windowOpen');
    });
    this.elements.newWindowButton().click();
  }

  verifyNewWindowOpened() {
    cy.get('@windowOpen').should('be.called');
  }

  verifyNewWindowMessage(expectedMessage) {
    // Open the URL that would be in the new window
    cy.get('@windowOpen').then(stub => {
      const url = stub.getCall(0).args[0];
      cy.visit(url);
      this.elements.sampleHeading().should('have.text', expectedMessage);
    });
  }
}

export default new BrowserWindowsPage();
