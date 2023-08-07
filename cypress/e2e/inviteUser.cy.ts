import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json';
import { Email } from "../pageObject/components/email";
import { UserRole, User, UserType, internalUser, externalUser } from "../pageObject/support/utils";

describe('Admin user', () => {
  before(() => {
    cy.clearAllLocalStorage()
    globalThis.internalUser = internalUser()
    globalThis.externalUser = externalUser()
    cy.visit('/')
  })

  it('should login', () => {
    cy.writeFile('cypress/fixtures/internalUser.json', globalThis.internalUser)
    cy.writeFile('cypress/fixtures/externalUser.json', globalThis.externalUser)
    Login.logIn(loginCred)
  })

  it('should set role to admin and go to the usermangement page', () => {
    UserManagement.getUserPage()
    UserManagement.setRole(UserRole.admin)
  })

  it('should invite user', () => {
    UserManagement.inviteUser(globalThis.internalUser, UserType.internalUsers)
    UserManagement.inviteUser(globalThis.externalUser, UserType.externalUser)
  })

  it('internal user should accept invitation', () => {
    Email.checkMail(globalThis.internalUser.email)
    Email.acceptInvite(globalThis.internalUser)
  })

  it('should login with new password', () => {
    Login.logIn(globalThis.internalUser)
    Login.logOut()
  })

  it('external user should accept invitation', () => {
    Email.checkMail(globalThis.externalUser.email)
    Email.acceptInvite(globalThis.externalUser)
  })

  it('should login with new password', () => {
    Login.logIn(globalThis.internalUser)
    Login.logOut()
  })
})


