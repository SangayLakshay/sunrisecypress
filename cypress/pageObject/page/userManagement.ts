import { tablePages } from "../components/tablePagination"

export default class UserManagement {
    static getUserPage() {
        cy.datacyClick('config')
        cy.datacyClick('User Management')
        cy.url().should('include', '/users')
    }

    static setRole(role: string) {
        cy.datacyClick('profile')
        cy.selection(' Switch to '+role)
        cy.datacyClick('profile')
    }

    static clickInviteUser() {
        cy.datacyClick('inviteUser')
        cy.visible('Invite New User')
        cy.datacyClick('Add User')
    }

    static inviteUsers(user: object, type: string) {
        cy.userType(type)
        cy.selectInput('salutation', user['Salutation'])
        cy.typeInput('firstname', user['FirstName'])
        cy.typeInput('lastname', user['LastName'])
        cy.typeInput('email', user['Email'])
        cy.typeInput('phone', user['Phone'])
        cy.selectInput('role', user['Role'])
        cy.selectInput('language', user['Language'])
        cy.selectOption('userType', user['Type'])
        if(type == 'External Users') {
            cy.typeInput('Customer Name', user['CustomerName']).then(() => {
                cy.get('mat-option').each(($option) => {
                    cy.wrap($option).invoke('text').then((text) => {
                        if (text.includes(user['CustomerName'])) {
                            cy.wrap($option).click()
                        }
                    })
                })
            })
            cy.selectOption('signOrderOnline', user['SignOrderOnline'])
        }
    }

    static checkContent(userType: string, user: object) {
        cy.datacyClick(userType)
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
                cy.log(`Total user = ${this.totalNumber}, per page = ${this.perPage} total pages = ${totalPage}`)
            })
        }) 
        cy.then( function(){
            tablePages(this.totalPage, user)
        }) 
    }

    static searchUser(userType: string, user: object) {
        cy.datacyClick(userType)
        cy.get('.temporary-layout').within(() => {
            cy.get('h2').should('have.text', userType)
            cy.datacy('search').clear().type(user['Email'])
        })
        cy.get('table tbody').within(($ele) => {
            cy.datacy('E-Mail').should('have.length', 1).and('include.text', user['Email'])
        })
    }

    static errorMessage(mess: string) {
        cy.get('whs-user-create-modal').within(() => {
            cy.get('mat-error').not('.hide').then(($err) => {
                cy.wrap($err).each(($ele) => {
                    cy.wrap($ele).should('include.text', mess)
                })
            })
            cy.datacyClick('Add User').and('have.class', 'cdk-focused')
        })
    }

    
}