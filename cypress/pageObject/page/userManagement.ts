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
        //click on the invite button
        cy.datacyClick('inviteUser')
        // check popup form
        cy.visible('Invite New User')
        cy.datacyClick('Add User')
    }

    static inviteUsers(user: object, type: string) {
        // select the internal option
        // fill out the form
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
            cy.typeInput('Customer Name', user['CustomerName'])
            cy.selectOption('signOrderOnline', user['SignOrderOnline'])
        }
    }


    static saveInvite(userType: string, user: object, option: string) {
        // enter save
        cy.datacyClick(option)
        // verify info saved
        cy.visible('User invited successfully')
        cy.checkContent(userType, user, 'contain.text')
    }

    static cancelInvite(userType: string, user: object) {
        // enter cancel
        cy.datacyClick('cancel')
        // verify no info added
        cy.checkContent(userType, user, 'not.contain.text')
    }

    static errorMessage(mess: string, length: number) {
        cy.get('whs-user-create-modal').within(() => {
            cy.get('mat-error').not('.hide').then(($err) => {
                cy.wrap($err).each(($ele) => {
                    cy.wrap($ele).should('include.text', mess)
                })
            })
            cy.datacyClick('Add User').and('have.class', 'cdk-focused')
        })
    }

    static editUser(email: string) {
        // select the edit button using email
        // check popup form
        // enter new info
        // save and verify the new info  
    }

    static deleteUser(confirmation: string) {
        // check pop up
        // press either confirmation
        cy.visible('User deleted successfully')
    }
}