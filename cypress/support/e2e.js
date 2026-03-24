// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Import cypress-wait-until
import 'cypress-wait-until';

// Import cypress drag-drop
import '@4tw/cypress-drag-drop';

// Hide fetch/XHR requests from command log to reduce noise
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Cookies are preserved by default in Cypress 12+

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions from the application
  if (err.message.includes('ResizeObserver')) {
    return false;
  }
  // Ignore DemoQA React findDOMNode errors
  if (err.message.includes('findDOMNode')) {
    return false;
  }
  return true;
});
