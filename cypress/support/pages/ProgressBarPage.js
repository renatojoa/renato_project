class ProgressBarPage {
  elements = {
    progressBarMenu: () => cy.contains('.text', 'Progress Bar'),
    startStopButton: () => cy.get('#startStopButton'),
    resetButton: () => cy.get('#resetButton'),
    progressBar: () => cy.get('.progress-bar')
  };

  clickProgressBar() {
    this.elements.progressBarMenu().scrollIntoView().click();
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

  start() {
    this.elements.startStopButton().click();
  }

  stop() {
    this.elements.startStopButton().click();
  }

  startShouldBeDisplayed(expectedText = 'Start') {
    const button = this.elements.startStopButton();
    button.should('be.visible')
      .and('be.enabled')
      .and('have.text', expectedText);
  }

  reset() {
    this.elements.resetButton().click();
  }

  getProgressValue() {
    return this.elements.progressBar().invoke('text').then(text => {
      return parseInt(text.replace('%', ''));
    });
  }

  waitForProgress(targetValue, operator = '>=') {
    cy.waitUntil(
      () => this.getProgressValue().then(value => {
        switch (operator) {
          case '>=':
            return value >= targetValue;
          case '<=':
            return value <= targetValue;
          case '==':
            return value === targetValue;
          default:
            return false;
        }
      }),
      {
        timeout: 120000,
        interval: 100,
        errorMsg: `Progress did not reach ${operator} ${targetValue}%`
      }
    );
  }

  stopBeforeReaching(maxPercentage) {
    const checkAndStop = () => {
      cy.wait(50);
      this.elements.progressBar().invoke('text').then(text => {
        const value = parseInt(text.replace('%', ''));
        cy.log(`📊 Progresso atual: ${value}%`);

        if (value >= maxPercentage - 5 && value < maxPercentage) {
          cy.log(`⏸️ Parando em ${value}%...`);
          this.elements.startStopButton().click();
        } else if (value < maxPercentage - 5) {
          checkAndStop();
        }
      });
    };

    checkAndStop();
  }

  verifyProgressValue(operator, value) {
    this.getProgressValue().should('satisfy', progress => {
      switch (operator) {
        case '<=':
          return progress <= value;
        case '>=':
          return progress >= value;
        case '==':
          return progress === value;
        default:
          return false;
      }
    });
  }
}

export default new ProgressBarPage();
