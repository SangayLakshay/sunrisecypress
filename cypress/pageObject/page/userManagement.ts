import { TablePages, getTotalPage } from "../components/tablePagination"
import { UserType,  User } from "../support/utils"

export default class UserManagement {
    static getUserPage() {
        cy.datacyClick('config')
        cy.datacyClick('User Management')
        cy.url().should('include', '/users')
    }

    static setRole(role: string) {
        cy.datacyClick('profile')
        cy.selection(' Switch to '+role)
    }

    static clickInviteUser() {
        cy.datacyClick('inviteUser')
        cy.visible('Invite New User')
        cy.datacyClick('Add User')
    }

    static inviteUsers(user: User, userType: string) {
        cy.userType(userType)
        const datacySelection = ['salutation', 'role', 'language']
        const datacyInput = ['firstname', 'lastname', 'email', 'phone']
        
        datacyInput.forEach((data) => {
            cy.typeInput(data, user[`${data}`])
        })
        datacySelection.forEach((data) => {
            cy.selectInput(data, user[`${data}`])
        })
        cy.selectOption('userType', user.type)
        if(userType === UserType.externalUser) {
            cy.typeSelect('Customer Name', user.customerName)
            cy.selectOption('signOrderOnline', user.signOrderOnline)
        }
    }

    static checkContent(user: User, userType: string) {
        cy.datacyClick(userType)
        getTotalPage()
        cy.then( function(){
            TablePages(this.totalPage, user)
        }) 
    }

    static searchUser(user: User, userType: string) {
        cy.datacyClick(userType)
        cy.get('.temporary-layout').within(() => {
            cy.get('h2').should('have.text', userType)
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
    
    static inviteUser(userObject: User, userType: string){
        UserManagement.clickInviteUser()
        UserManagement.inviteUsers(userObject, userType)
        cy.datacyClick('Add User').then(() => {
            cy.popUpMessage('User invited successfully')
            UserManagement.searchUser(userObject, userType)
        })
    }
}