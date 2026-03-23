// ***********************************************
// Custom commands for Cypress
// ***********************************************

/**
 * Remove ads and footer from DemoQA
 */
Cypress.Commands.add('removeAds', () => {
  cy.document().then(doc => {
    const footer = doc.querySelector('footer');
    if (footer) footer.remove();

    const ads = doc.querySelectorAll('ins, iframe[id*="google_ads"]');
    ads.forEach(ad => ad.remove());
  });
});

/**
 * Wait until condition is met
 */
Cypress.Commands.add('waitUntil', (checkFunction, options = {}) => {
  const defaults = {
    timeout: 30000,
    interval: 100,
    errorMsg: 'Timed out waiting for condition'
  };

  const config = { ...defaults, ...options };
  const startTime = Date.now();

  const check = () => {
    return cy.then(() => {
      return checkFunction();
    }).then(result => {
      if (result) {
        return cy.wrap(result);
      }

      if (Date.now() - startTime > config.timeout) {
        throw new Error(config.errorMsg);
      }

      return cy.wait(config.interval).then(check);
    });
  };

  return check();
});
