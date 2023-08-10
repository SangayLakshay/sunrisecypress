import { User } from '../support/utils'

export const NextTable = () => {
    cy.datacy('pagination').within(() => {
        cy.get('button[aria-label="Next page"]').click()
    })
}

export const getTotalPage = () =>  {
    return ( 
        cy.datacy('pagination').within( function(){
            cy.get('.mat-paginator-range-label').invoke('text').then(totalNumber => {
                let num = parseInt(totalNumber.split('of ')[1])
                cy.wrap(num).as('totalNumber')
            })
            cy.get('[aria-label="Items per page"]').invoke('text').then(perPage => {
                let page = parseInt(perPage)
                cy.wrap(page).as('perPage')
            })
            cy.then( function(){
                let totalPage = Math.floor(this.totalNumber/this.perPage)
                if (this.totalNumber%this.perPage !== 0)  ++totalPage
                cy.wrap(totalPage).as('totalPage')
            })
        }) 
    )
}

export const TablePages = (pages:number, user:User) => { 
    if ( pages > 1) {
        cy.datacy('E-Mail').each( ($email) => {
            var emails = Cypress._.map($email, (val) => val.innerText)
            if(emails.includes(user.email)) {
                return false
            }
        })
        NextTable()
        TablePages( --pages, user)
    }
}