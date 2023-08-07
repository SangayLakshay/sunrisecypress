// Import commands.js using ES2015 syntax:
import './commands'
import '../pageObject/support/utils'

//support/command.ts
import 'cypress-mailosaur';

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
        popUpMessage(message: string): Chainable<Element> 
        typeSelect(dataCy: string, customerName: string): Chainable<Element> 
      }
    }
  }

