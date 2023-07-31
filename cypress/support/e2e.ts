// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
//support/command.ts
import 'cypress-mailosaur';

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare global {
    namespace Cypress {
      interface Chainable {
        datacy(selector: string): Chainable<Element>
        input(input: string): Chainable<Element>
        visible(selector: string): Chainable<Element>
        getClick(selector: string): Chainable<Element>
        selection(selector: string): Chainable<Element>
        datacyClick(selector: string): Chainable<Element>
        typeInput(dataCy: string, input: string): Chainable<Element>
        selectInput(dataCy: string, input: string): Chainable<Element>
        selectOption(dataCy: string, input: string): Chainable<Element>
        login(email: string, password: string): Chainable<Element>
        userType(type: string): Chainable<Element>
        checkContent(userType: string, user: object): Chainable<Element> 
      }
    }
  }