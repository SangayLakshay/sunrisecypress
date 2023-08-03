import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import { UserRole, UserType, user } from "../support/utils";
import userDetails from '../fixtures/userDetails.json'
describe('Admin user', () => {
    before(() => {
        cy.visit('/')
    })

    it('should login and go to user management page', () => {
        Login.logIn(loginCred)
        UserManagement.setRole(UserRole.admin)
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
        cy.userType(UserType.internalUsers)
        UserManagement.errorMessage('This field is required.')
        cy.userType(UserType.externalUser)
        UserManagement.errorMessage('This field is required.')
    })

    it('should try to invite already existing user', () => {
        UserManagement.inviteUsers(userDetails)
        cy.datacyClick('Add User').then(() => {
            cy.visible('1. USER ALREADY EXISTS IN THE PORTAL. PLEASE RE-INVITE IF YOU NEED TO SEND INVITATION AGAIN.')
        })
        cy.datacyClick('close')
    })

    it('should logout', () => {
        Login.logOut()
    })
})