import { User } from "../../support/utils"

export const NextTable = () => {
    cy.datacy('pagination').within(() => {
        cy.get('button[aria-label="Next page"]').click()
    })
}

export const TablePages = (pages:number, user:User) => { 
    cy.get('tbody').then(($tbody) => {
        cy.log(`First ${pages}`)
        if ( pages > 1) {
            cy.wrap($tbody).then(() => {
                cy.datacy('E-Mail').each(($email) => {
                    cy.wrap($email).invoke('text').then((text) => {
                        cy.log(`each email ${pages}`)
                        // cy.log(text + ' ' + user['Email'])
                        if(text.includes(user.email)) {
                            cy.log(`Email found ${text}`)
                            pages = 0
                            cy.log(`matched email${pages}`)
                            return false
                        }
                    })
                })
                NextTable()
                cy.log(`before recursion ${pages}`)
                TablePages( --pages, user)
            })
        } 
    })
}