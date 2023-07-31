import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import internalUserVal from '../fixtures/internalUserVal.json'
import externalUserVal from '../fixtures/externalUserVal.json'
import internalUser from '../fixtures/internalUser.json'
import externalUser from '../fixtures/externalUser.json'

describe('Admin user', () => {
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
        UserManagement.errorMessage('This field is required.')
    })

    it('should try to submit empty fields', () => { 
        cy.userType('Internal Users')
        UserManagement.errorMessage('This field is required.')
    })

    it('should enter user with different values and give error messages', () => {
        internalUserVal.forEach((user) => {
            UserManagement.inviteUsers(user, 'Internal Users')
            UserManagement.errorMessage(user.error)
        })
    })
    
    it('should try to invite already existing user', () => {
        UserManagement.inviteUsers(internalUser, 'Internal Users')
        cy.datacyClick('Add User').then(() => {
            cy.visible('1. USER ALREADY EXISTS IN THE PORTAL. PLEASE RE-INVITE IF YOU NEED TO SEND INVITATION AGAIN.')
        })
        cy.datacyClick('close')
    })
    
    it('should click on invite user button', () => {
        UserManagement.clickInviteUser()
    })

    it('should try to submit empty fields', () => { 
        cy.userType('External Users')
        UserManagement.errorMessage('This field is required.')
    })

    it('should enter user with different values and give error messages', () => {
        externalUserVal.forEach((user) => {
            UserManagement.inviteUsers(user, 'External Users')
            UserManagement.errorMessage(user.error)
        })
    })

    it('should try to invite already existing user', () => {
        UserManagement.inviteUsers(externalUser, 'External Users')
        cy.datacyClick('Add User').then(() => {
            cy.visible('1. USER ALREADY EXISTS IN THE PORTAL. PLEASE RE-INVITE IF YOU NEED TO SEND INVITATION AGAIN.')
        })
        cy.datacyClick('close')
    })

    it('should logout', () => {
        Login.logOut()
    })
})