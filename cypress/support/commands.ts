
Cypress.Commands.add("input", (input: string) => { cy.get('input').clear().type(input) })

Cypress.Commands.add("datacy",(selector: string) => { cy.get(`[data-cy='${selector}']`) })

Cypress.Commands.add('visible', (selector: string) => { cy.contains(selector).should('be.visible') })

Cypress.Commands.add('getClick', (selector: string) => { cy.get(selector).click() })

Cypress.Commands.add('selection', (selector: string) => { cy.contains(selector).click() })

Cypress.Commands.add('datacyClick', (selector: string) => { cy.datacy(selector).click()})


Cypress.Commands.add('typeInput', (dataCy: string, input: string) => {
    cy.datacyClick(dataCy)
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

Cypress.Commands.add('checkContent', (userType: string, user: object, visibility: string) => { 
    cy.selection(userType).then(() => {
        cy.contains(user['Email']).parent('.tr').then(($ele) => {
            cy.wrap($ele).as('userRow')
            
        })
    })
})

