import { TablePages } from "../components/tablePagination"
import { UserType,  User } from "../../support/utils"

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

    static inviteUsers(user: User) {
        cy.userType(user.userType)
        cy.selectInput('salutation', user.salutation)
        cy.typeInput('firstname', user.firstName)
        cy.typeInput('lastname', user.lastName)
        cy.typeInput('email', user.email)
        cy.typeInput('phone', user.phone)
        cy.selectInput('role', user.role)
        cy.selectInput('language', user.language)
        cy.selectOption('userType', user.type)
        if(user.userType === UserType.externalUser) {
            cy.typeInput('Customer Name', user.customerName).then(() => {
                cy.get('mat-option').each(($option) => {
                    cy.wrap($option).invoke('text').then((text) => {
                        if (text.includes(user.customerName)) {
                            cy.wrap($option).click()
                        }
                    })
                })
            })
            cy.selectOption('signOrderOnline', user.signOrderOnline)
        }
    }

    static checkContent(user: User) {
        cy.datacyClick(user.userType)
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
            TablePages(this.totalPage, user)
        }) 
    }

    static searchUser(user: User) {
        cy.datacyClick(user.userType)
        cy.get('.temporary-layout').within(() => {
            cy.get('h2').should('have.text', user.userType)
            cy.datacy('search').clear().type(user.email)
        })
        cy.get('table tbody').within(($ele) => {
            cy.datacy('E-Mail').should('have.length', 1).and('include.text', user.email)
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