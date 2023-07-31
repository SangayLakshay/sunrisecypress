import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import externalUser from '../fixtures/externalUser.json'
import internalUser from '../fixtures/internalUser.json'

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

  it('should find user in table', () => {
    UserManagement.checkContent('Internal Users', internalUser)
  })
})