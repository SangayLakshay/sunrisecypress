export const nextTable = () => {
    cy.datacy('pagination').within(() => {
        cy.get('button[aria-label="Next page"]').click()
    })
}

export const tablePages = (pages:number, user:object) => { 
    cy.get('tbody').then(($tbody) => {
        if ( pages > 1) {
            cy.wrap($tbody).then(() => {
                cy.datacy('E-Mail').each(($email) => {
                    cy.wrap($email).invoke('text').then((text) => {
                        // cy.log(text + ' ' + user['Email'])
                        if(text.includes(user['Email'])) {
                            cy.log(`Email found ${text}`)
                            return false
                        }
                    })
                })
                nextTable()
                tablePages( --pages, user)
            })
        } 
    })
}