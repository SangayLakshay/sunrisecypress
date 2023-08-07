Cypress.Commands.add("input", (input: string) => { cy.get('input').clear().type(input) })

Cypress.Commands.add("datacy",(selector: string) => { cy.get(`[data-cy='${selector}']`) })

Cypress.Commands.add('visible', (selector: string) => { cy.contains(selector).should('be.visible') })

Cypress.Commands.add('getClick', (selector: string) => { cy.get(selector).click() })

Cypress.Commands.add('selection', (selector: string) => { cy.contains(selector).click() })

Cypress.Commands.add('datacyClick', (selector: string) => { cy.datacy(selector).click()})

Cypress.Commands.add('typeInput', (dataCy: string, input: string) => {
    cy.datacy(dataCy).within(() => {
        cy.input(input)
    })
})

Cypress.Commands.add('selectInput', (dataCy: string, input: string) => {
    cy.datacyClick(dataCy).then(() => {
        cy.get('mat-option').parent().within(($ele) => {
            cy.wrap($ele).selection(input)
        })
    })    
})

Cypress.Commands.add('selectOption', (dataCy: string, input: string) => {
    cy.datacy(dataCy).within(($ele) => {
        cy.wrap($ele).selection(input)
    })
})

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.typeInput('email', email)
    cy.typeInput('password', password)
    cy.datacyClick('login')
})

Cypress.Commands.add('userType', (type: string) => {
    cy.get('whs-user-create-modal').within(() => {
        cy.datacyClick(type)
    })
})

Cypress.Commands.add('popUpMessage', (message: string) => {
    cy.visible(message).then(() => {
        cy.contains('close').click()
    })
})

Cypress.Commands.add('typeSelect', (dataCy: string, customerName: string) => {
    cy.typeInput(dataCy, customerName).then(() => {
        cy.get('mat-option').each(($option) => {
            cy.wrap($option).invoke('text').then((text) => {
                if (text.includes(customerName)) {
                    cy.wrap($option).click()
                }
            })
        })
    })
})