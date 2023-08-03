import Login from "../pageObject/page/login";
import UserManagement from "../pageObject/page/userManagement";
import loginCred from '../fixtures/loginCred.json';
import { Email } from "../pageObject/components/email";
import { UserRole, User, user } from "../support/utils";

describe('Admin user', () => {
  before(() => {
    cy.clearAllLocalStorage()
    globalThis.user = user()
    cy.visit('/')
  })

  it('should login', () => {
    cy.writeFile('cypress/fixtures/userDetails.json', globalThis.user)
    Login.logIn(loginCred)
  })

  it('should set role to admin and go to the usermangement page', () => {
    UserManagement.setRole(UserRole.admin)
    UserManagement.getUserPage()
  })

  it('should invite internal user', () => {
    inviteUser(globalThis.user)
  })

  it('should accept invitation', () => {
    Email.acceptInvite(globalThis.user)
  })

  it('should login with new password', () => {
    Login.logIn(globalThis.user)
  })
})

const inviteUser = (userObject: User) => {
  UserManagement.clickInviteUser()
  UserManagement.inviteUsers(userObject)
  cy.datacyClick('Add User').then(() => {
      cy.visible('User invited successfully')
      cy.wait(2000)
      UserManagement.searchUser(userObject)
      Email.checkMail(userObject.email)
      cy.wait(1000)
  })
}
