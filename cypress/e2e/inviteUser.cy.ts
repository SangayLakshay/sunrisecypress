import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import internalUser from '../fixtures/internalUser.json'
import externalUser from '../fixtures/externalUser.json'

describe('Admin user', () => {
  before(() => {
    cy.clearAllLocalStorage()
    cy.visit('/')
  })

  it('should login', () => {
    Login.logIn(loginCred)
  })

  it('should set role to admin and go to the usermangement page', () => {
    UserManagement.setRole('Admin')
    UserManagement.getUserPage()
  })

  it('should click on the invite user', () => {
    UserManagement.clickInviteUser()
  })

  it('should enter internal user form', () => {
    UserManagement.inviteUsers(internalUser, "Internal Users")
    // UserManagement.saveInvite('Internal Users', internalUser)

  })

  it('should enter external user form', () => {
    UserManagement.inviteUsers(externalUser, "External Users")
  })
})