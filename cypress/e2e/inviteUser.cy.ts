import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json';
import { Email } from "../pageObject/components/email";
import { UserRoleInternal, UserType, user } from "../pageObject/support/utils";

describe('Admin user', () => {
  before(() => {
    cy.clearAllLocalStorage()
    const roles = Object.values(UserRoleInternal)
    globalThis.internalUser = user(roles)
    cy.visit('/')
  })

  it('should login', () => {
    Login.logIn(loginCred)
  })

  it('should set role to admin and go to the usermangement page', () => {
    UserManagement.getUserPage()
    UserManagement.setRole(UserRoleInternal.admin)
  })

  it('should invite user', () => {
    UserManagement.inviteUser(globalThis.internalUser, UserType.internalUsers)
  })

  it('internal user should accept invitation', () => {
    Email.checkMail(globalThis.internalUser.email)
    Email.acceptInvite(globalThis.internalUser)
  })

  it('should login with new password', () => {
    Login.logIn(globalThis.internalUser)
  })
})


