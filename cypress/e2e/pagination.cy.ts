import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json'
import { UserRole, user } from "../support/utils";
import userDetails from '../fixtures/userDetails.json'

describe('Admin user', () => {
  before(() => {
    cy.clearAllLocalStorage()
    cy.visit('/')
  })

  it('should login', () => {
    Login.logIn(loginCred)
  })

  it('should set role to admin and go to usermanagement', () => {
    UserManagement.setRole(UserRole.admin)
    UserManagement.getUserPage()
  })

  it('should find user in table', () => {
    UserManagement.checkContent(userDetails)
  })
})