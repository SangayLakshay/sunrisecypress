import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import { UserRoleInternal, UserType } from "../pageObject/support/utils";
import internalUser from '../fixtures/internalUser.json';

describe('Admin user', () => {
    before(() => {
        cy.visit('/')
    })

    it('should login and go to user management page', () => {
        Login.logIn(loginCred)
        UserManagement.getUserPage()
    })

    it('should click on invite user button', () => {
        UserManagement.setRole(UserRoleInternal.admin)
        UserManagement.clickInviteUser()
    })

    it('should try to submit directly', () => {
        cy.datacyClick('Add User')
        UserManagement.errorMessage('This field is required.')
    })

    it('should try to submit empty fields', () => { 
        cy.userType(UserType.internalUsers)
        UserManagement.errorMessage('This field is required.')
    })

    it('should try to invite already existing internal user', () => {
        UserManagement.inviteUsers(internalUser, UserType.internalUsers)
        cy.datacyClick('Add User').then(() => {
            cy.popUpMessage('1. USER ALREADY EXISTS IN THE PORTAL. PLEASE RE-INVITE IF YOU NEED TO SEND INVITATION AGAIN.')
        })
        cy.datacyClick('close')
    })

    it('should logout', () => {
        Login.logOut()
    })
})