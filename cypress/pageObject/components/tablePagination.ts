import { User } from "../support/utils"

export const NextTable = () => {
    cy.datacy('pagination').within(() => {
        cy.get('button[aria-label="Next page"]').click()
    })
}

export const getTotalPage = () =>  {
    return ( cy.datacy('pagination').within( function(){
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
    cy.get('tbody').then(($tbody) => {
        if ( pages > 1) {
            cy.wrap($tbody).then(() => {
                cy.datacy('E-Mail').each( ($email) => {
                    cy.wrap($email).invoke('text').then((text) => {
                        if(text.includes(user.email)) {
                            cy.log(`matched email${pages}`)
                            return false
                        }
                    })
                })
                NextTable()
                TablePages( --pages, user)
            })
        }
    })
}