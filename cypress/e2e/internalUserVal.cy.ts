import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import internalUserVal from '../fixtures/internalUserVal.json'
import externalUser from '../fixtures/externalUser.json'

describe('Internal User', () => {
    before(() => {
        cy.visit('/')
    })

    it('should login and go to user management page', () => {
        Login.logIn(loginCred)
        UserManagement.setRole('Admin')
        UserManagement.getUserPage()
    })

    it('should click on invite user button', () => {
        UserManagement.clickInviteUser()
    })

    it('should try to submit directly', () => {
        cy.datacyClick('Add User')
        UserManagement.errorMessage('This field is required.', 1)
    })

    it('should try to submit empty fields', () => { 
        cy.userType('Internal Users')
        UserManagement.errorMessage('This field is required.', 8)
    })
    it('should enter user with different values and give error messages', () => {
        internalUserVal.forEach((user) => {
            UserManagement.inviteUsers(user, 'Internal Users')
            UserManagement.errorMessage(user.error, 1)
        })
    })
})